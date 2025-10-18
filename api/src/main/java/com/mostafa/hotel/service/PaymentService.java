package com.mostafa.hotel.service;


import com.mostafa.hotel.dto.payment.CreatePaymentDTO;
import com.mostafa.hotel.dto.payment.PayShortageDTO;
import com.mostafa.hotel.dto.payment.PaymentResponseDTO;
import com.mostafa.hotel.enums.BookingStatus;
import com.mostafa.hotel.enums.PaymentStatus;
import com.mostafa.hotel.global.CustomResponseException;
import com.mostafa.hotel.mapper.EntityDtoMapper;
import com.mostafa.hotel.model.Booking;
import com.mostafa.hotel.model.Payment;
import com.mostafa.hotel.model.User;
import com.mostafa.hotel.repository.BookingRepo;
import com.mostafa.hotel.repository.PaymentRepo;
import com.mostafa.hotel.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepo paymentRepo;
    private final BookingRepo bookingRepo;
    private final CurrentUser currentUser;
    private final EntityDtoMapper mapper;


    // Create Payment
    @Transactional
    public PaymentResponseDTO createPayment(CreatePaymentDTO dto) {
        User authUser = currentUser.getCurrentUser();

        Booking booking = bookingRepo.findById(dto.bookingId())
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Booking not found"));

        if (!booking.getUser().getId().equals(authUser.getId())) {
            throw CustomResponseException.BadRequest("You can only create payments for your own bookings");
        }

        if (booking.getPayment() != null) {
            throw CustomResponseException.BadRequest("Payment already exists for this booking");
        }

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw CustomResponseException.BadRequest("Can only create payment for pending bookings");
        }

        BigDecimal expectedAmount = calculateTotalAmount(booking);

        Payment payment = mapper.toPaymentEntity(dto);
        payment.setBooking(booking);
        payment.setUser(authUser);

        int comparison = payment.getAmount().compareTo(expectedAmount);

        if (comparison < 0) {
            // Partial payment - Set to REFUNDED
            payment.setStatus(PaymentStatus.REFUNDED);
            BigDecimal shortage = expectedAmount.subtract(payment.getAmount());
            payment.setNotes("Partial payment received. Expected: " + expectedAmount +
                    ", Paid: " + payment.getAmount() + ". Shortage: " + shortage +
                    ". Please pay the remaining amount to confirm booking.");
            booking.setStatus(BookingStatus.PARTIAL_PAYMENT);

        } else if (comparison > 0) {
            // Overpayment - Set to PAID
            payment.setStatus(PaymentStatus.PAID);
            BigDecimal extra = payment.getAmount().subtract(expectedAmount);
            payment.setNotes("Payment completed with overpayment. Expected: " + expectedAmount +
                    ", Paid: " + payment.getAmount() + ". Extra: " + extra);
            booking.setStatus(BookingStatus.COMPLETED);

        } else {
            // Exact payment - Set to PAID
            payment.setStatus(PaymentStatus.PAID);
            payment.setNotes("Payment completed successfully for exact amount: " + expectedAmount);
            booking.setStatus(BookingStatus.COMPLETED);
        }

        Payment savedPayment = paymentRepo.save(payment);
        bookingRepo.save(booking);

        return mapper.toPaymentResponseDTO(savedPayment);
    }

    // Pay Shortage for Refunded Partial Payment
    @Transactional
    public PaymentResponseDTO payShortage(UUID paymentId, PayShortageDTO dto) {
        User authUser = currentUser.getCurrentUser();

        Payment payment = paymentRepo.findById(paymentId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Payment not found with ID: " + paymentId));

        if (!payment.getUser().getId().equals(authUser.getId())) {
            throw CustomResponseException.BadRequest("You can only pay shortage for your own payments");
        }

        if (payment.getStatus() != PaymentStatus.REFUNDED) {
            throw CustomResponseException.BadRequest("Can only pay shortage for refunded payments");
        }

        Booking booking = payment.getBooking();

        if (booking.getStatus() != BookingStatus.PARTIAL_PAYMENT) {
            throw CustomResponseException.BadRequest("Booking must have partial payment status to pay shortage");
        }

        BigDecimal expectedAmount = calculateTotalAmount(booking);
        BigDecimal shortage = expectedAmount.subtract(payment.getAmount());

        int comparison = dto.shortageAmount().compareTo(shortage);

        if (comparison < 0) {
            throw CustomResponseException.BadRequest(
                    "Shortage amount is still insufficient. Required: " + shortage +
                            ", Provided: " + dto.shortageAmount()
            );
        }

        BigDecimal newTotalAmount = payment.getAmount().add(dto.shortageAmount());
        payment.setAmount(newTotalAmount);
        payment.setStatus(PaymentStatus.PAID);
        booking.setStatus(BookingStatus.COMPLETED);

        if (comparison > 0) {
            BigDecimal extra = dto.shortageAmount().subtract(shortage);
            payment.setNotes("Shortage paid successfully with overpayment. Initial: " +
                    expectedAmount.subtract(shortage) +
                    ", Shortage paid: " + dto.shortageAmount() +
                    ", Total: " + newTotalAmount +
                    ", Extra: " + extra);
        } else {
            payment.setNotes("Shortage paid successfully. Initial: " +
                    expectedAmount.subtract(shortage) +
                    ", Shortage paid: " + shortage +
                    ", Total: " + newTotalAmount);
        }

        Payment updatedPayment = paymentRepo.save(payment);
        bookingRepo.save(booking);

        return mapper.toPaymentResponseDTO(updatedPayment);
    }

    // Get Single
    public PaymentResponseDTO getPaymentById(UUID paymentId) {
        Payment payment = paymentRepo.findById(paymentId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Payment not found with this ID: " + paymentId));

        return mapper.toPaymentResponseDTO(payment);
    }

    // Get All for Current User
    public Page<PaymentResponseDTO> getMyPayments(int page, int size) {
        User authUser = currentUser.getCurrentUser();

        Pageable pageable = PageRequest.of(page, size);
        Page<Payment> paymentsPage = paymentRepo.findByUserId(authUser.getId(), pageable);

        return paymentsPage.map(mapper::toPaymentResponseDTO);
    }

    // Get All for Specific User
    public Page<PaymentResponseDTO> getUserPayments(UUID userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Payment> paymentsPage = paymentRepo.findByUserId(userId, pageable);

        return paymentsPage.map(mapper::toPaymentResponseDTO);
    }

    // Get All for ADMIN && MANAGER
    public Page<PaymentResponseDTO> getAllPayments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Payment> paymentsPage = paymentRepo.findAll(pageable);

        return paymentsPage.map(mapper::toPaymentResponseDTO);
    }


    // ==================== PRIVATE HELPER METHOD ====================
    // Calculate total amount based on booking
    private BigDecimal calculateTotalAmount(Booking booking) {
        long numberOfNights = ChronoUnit.DAYS.between(
                booking.getCheckInDate(),
                booking.getCheckOutDate()
        );

        if (numberOfNights <= 0) {
            throw CustomResponseException.BadRequest("Invalid booking dates");
        }

        BigDecimal pricePerNight;

        if (booking.isApartmentBooking()) {
            pricePerNight = booking.getApartment().getPricePerNight();
        } else if (booking.isRoomBooking()) {
            pricePerNight = booking.getRoom().getPricePerNight();
        } else {
            throw CustomResponseException.BadRequest("Invalid booking type");
        }

        return pricePerNight.multiply(BigDecimal.valueOf(numberOfNights));
    }


}