package com.mostafa.hotel.service;


import com.mostafa.hotel.dto.booking.BookingResponseDTO;
import com.mostafa.hotel.dto.booking.CreateBookingDTO;
import com.mostafa.hotel.enums.BookingStatus;
import com.mostafa.hotel.enums.BookingType;
import com.mostafa.hotel.enums.PaymentStatus;
import com.mostafa.hotel.global.CustomResponseException;
import com.mostafa.hotel.mapper.EntityDtoMapper;
import com.mostafa.hotel.model.*;
import com.mostafa.hotel.repository.*;
import com.mostafa.hotel.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepo bookingRepo;
    private final HotelRepo hotelRepo;
    private final ApartmentRepo apartmentRepo;
    private final ApartmentAvailabilityRepo apartmentAvailabilityRepo;
    private final RoomRepo roomRepo;
    private final RoomAvailabilityRepo roomAvailabilityRepo;
    private final CurrentUser currentUser;
    private final EntityDtoMapper mapper;


    // Create a new booking (Room or Apartment)
    @Transactional
    public BookingResponseDTO createBooking(CreateBookingDTO dto) {
        User user = currentUser.getCurrentUser();
        if (user == null) {
            throw CustomResponseException.BadCredentials();
        }

        validateBookingDates(dto.checkInDate(), dto.checkOutDate());

        Hotel hotel = hotelRepo.findById(dto.hotelId())
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Hotel not found"));

        validateUserDoesNotHaveConflictingBooking(user.getId(), dto.checkInDate(), dto.checkOutDate());

        Apartment apartment = null;
        Room room = null;

        if (dto.bookingType() == BookingType.APARTMENT) {
            apartment = handleApartmentBooking(dto);
        } else if (dto.bookingType() == BookingType.ROOM) {
            room = handleRoomBooking(dto);
        } else {
            throw CustomResponseException.BadRequest("Invalid booking type");
        }

        Booking booking = mapper.toBookingEntity(dto, user, hotel, apartment, room);
        Booking savedBooking = bookingRepo.save(booking);

        markDatesAsUnavailable(dto.bookingType(), apartment, room, dto.checkInDate(), dto.checkOutDate());

        return mapper.toBookingResponseDTO(savedBooking);
    }

    // Cancel a booking
    @Transactional
    public BookingResponseDTO cancelBooking(UUID bookingId) {
        User user = currentUser.getCurrentUser();
        if (user == null) {
            throw CustomResponseException.BadCredentials();
        }

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw CustomResponseException.BadRequest("You are not authorized to cancel this booking");
        }

        // Check payment status if payment exists
        if (booking.getPayment() != null) {
            PaymentStatus paymentStatus = booking.getPayment().getStatus();

            // Can only cancel if payment is PENDING
            if (paymentStatus != PaymentStatus.PENDING) {
                throw CustomResponseException.BadRequest(
                        "Cannot cancel booking. Payment status is " + paymentStatus +
                                ". You can only cancel bookings with PENDING payment status.");
            }
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw CustomResponseException.BadRequest("Booking is already cancelled");
        }

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw CustomResponseException.BadRequest("Cannot cancel a completed booking");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updatedBooking = bookingRepo.save(booking);

        releaseDates(booking.getBookingType(), booking.getApartment(), booking.getRoom(),
                booking.getCheckInDate(), booking.getCheckOutDate());

        return mapper.toBookingResponseDTO(updatedBooking);
    }

    //   Get Single
    public BookingResponseDTO getSingle(UUID bookingId) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Booking not found with this ID: " + bookingId));

        return mapper.toBookingResponseDTO(booking);
    }

    // Get all bookings for current user
    public Page<BookingResponseDTO> getCurrentUserBookings(int page, int size) {
        User user = currentUser.getCurrentUser();
        if (user == null) {
            throw CustomResponseException.BadCredentials();
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<Booking> bookingsPage = bookingRepo.findByUserId(user.getId(), pageable);

        return bookingsPage.map(mapper::toBookingResponseDTO);
    }

    // Get all bookings for a specific user by ID (Admin && Manager)
    public Page<BookingResponseDTO> getUserBookings(UUID userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Booking> bookingsPage = bookingRepo.findByUserId(userId, pageable);

        return bookingsPage.map(mapper::toBookingResponseDTO);
    }

    // Get all bookings for Room
    public List<BookingResponseDTO> getRoomBookings(UUID roomId) {
        List<Booking> bookings = bookingRepo.findByRoomId(roomId);
        return bookings.stream()
                .map(mapper::toBookingResponseDTO)
                .toList();
    }

    // Get all bookings for Apartment
    public List<BookingResponseDTO> getApartmentBookings(UUID apartmentId) {
        List<Booking> bookings = bookingRepo.findByApartmentId(apartmentId);
        return bookings.stream()
                .map(mapper::toBookingResponseDTO)
                .toList();
    }


    // ==================== PRIVATE HELPER METHODS ====================
    private void validateBookingDates(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn.isAfter(checkOut) || checkIn.isEqual(checkOut)) {
            throw CustomResponseException.BadRequest("Check-out date must be after check-in date");
        }

        if (checkIn.isBefore(LocalDate.now())) {
            throw CustomResponseException.BadRequest("Check-in date cannot be in the past");
        }
    }

    private void validateUserDoesNotHaveConflictingBooking(UUID userId, LocalDate checkIn, LocalDate checkOut) {
        boolean hasConflict = bookingRepo.existsByUserIdAndDateRange(userId, checkIn, checkOut);
        if (hasConflict) {
            throw CustomResponseException.BadRequest(
                    "You already have a booking that conflicts with these dates. Please choose different dates.");
        }
    }

    private Apartment handleApartmentBooking(CreateBookingDTO dto) {
        if (dto.apartmentId() == null) {
            throw CustomResponseException.BadRequest("Apartment ID is required for apartment booking");
        }

        Apartment apartment = apartmentRepo.findById(dto.apartmentId())
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Apartment not found"));

        if (!apartment.getIsAvailable()) {
            throw CustomResponseException.BadRequest("Apartment is not available for booking");
        }

        if (dto.numberOfGuests() > apartment.getTotalCapacity()) {
            throw CustomResponseException.BadRequest(
                    String.format("Number of guests (%d) exceeds apartment capacity (%d)",
                            dto.numberOfGuests(), apartment.getTotalCapacity()));
        }

        if (!isApartmentAvailableForDates(apartment.getId(), dto.checkInDate(), dto.checkOutDate())) {
            throw CustomResponseException.BadRequest("Apartment is not available for the selected dates");
        }

        return apartment;
    }

    private Room handleRoomBooking(CreateBookingDTO dto) {
        if (dto.roomId() == null) {
            throw CustomResponseException.BadRequest("Room ID is required for room booking");
        }

        Room room = roomRepo.findById(dto.roomId())
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Room not found"));

        if (!room.getIsAvailable()) {
            throw CustomResponseException.BadRequest("Room is not available for booking");
        }

        if (!room.getBookableIndividually()) {
            throw CustomResponseException.BadRequest("This room cannot be booked individually");
        }

        if (dto.numberOfGuests() > room.getCapacity()) {
            throw CustomResponseException.BadRequest(
                    String.format("Number of guests (%d) exceeds room capacity (%d)",
                            dto.numberOfGuests(), room.getCapacity()));
        }

        if (!isRoomAvailableForDates(room.getId(), dto.checkInDate(), dto.checkOutDate())) {
            throw CustomResponseException.BadRequest("Room is not available for the selected dates");
        }

        return room;
    }

    private boolean isApartmentAvailableForDates(UUID apartmentId, LocalDate checkIn, LocalDate checkOut) {
        boolean hasBookings = bookingRepo.existsByApartmentIdAndDateRange(apartmentId, checkIn, checkOut);
        if (hasBookings) {
            return false;
        }

        List<LocalDate> dates = checkIn.datesUntil(checkOut).collect(Collectors.toList());
        for (LocalDate date : dates) {
            ApartmentAvailability availability = apartmentAvailabilityRepo
                    .findByApartmentIdAndDate(apartmentId, date);
            if (availability != null && !availability.getIsAvailable()) {
                return false;
            }
        }

        return true;
    }

    private boolean isRoomAvailableForDates(UUID roomId, LocalDate checkIn, LocalDate checkOut) {
        boolean hasBookings = bookingRepo.existsByRoomIdAndDateRange(roomId, checkIn, checkOut);
        if (hasBookings) {
            return false;
        }

        List<LocalDate> dates = checkIn.datesUntil(checkOut).collect(Collectors.toList());
        for (LocalDate date : dates) {
            RoomAvailability availability = roomAvailabilityRepo.findByRoomIdAndDate(roomId, date);
            if (availability != null && !availability.getIsAvailable()) {
                return false;
            }
        }

        return true;
    }

    private void markDatesAsUnavailable(BookingType bookingType, Apartment apartment, Room room,
                                        LocalDate checkIn, LocalDate checkOut) {
        List<LocalDate> dates = checkIn.datesUntil(checkOut).collect(Collectors.toList());

        if (bookingType == BookingType.APARTMENT && apartment != null) {
            for (LocalDate date : dates) {
                ApartmentAvailability availability = apartmentAvailabilityRepo
                        .findByApartmentIdAndDate(apartment.getId(), date);

                if (availability == null) {
                    availability = ApartmentAvailability.builder()
                            .apartment(apartment)
                            .date(date)
                            .isAvailable(false)
                            .build();
                } else {
                    availability.setIsAvailable(false);
                }
                apartmentAvailabilityRepo.save(availability);
            }
        } else if (bookingType == BookingType.ROOM && room != null) {
            for (LocalDate date : dates) {
                RoomAvailability availability = roomAvailabilityRepo.findByRoomIdAndDate(room.getId(), date);

                if (availability == null) {
                    availability = RoomAvailability.builder()
                            .room(room)
                            .date(date)
                            .isAvailable(false)
                            .build();
                } else {
                    availability.setIsAvailable(false);
                }
                roomAvailabilityRepo.save(availability);
            }
        }
    }

    private void releaseDates(BookingType bookingType, Apartment apartment, Room room,
                              LocalDate checkIn, LocalDate checkOut) {
        List<LocalDate> dates = checkIn.datesUntil(checkOut).collect(Collectors.toList());

        if (bookingType == BookingType.APARTMENT && apartment != null) {
            for (LocalDate date : dates) {
                ApartmentAvailability availability = apartmentAvailabilityRepo
                        .findByApartmentIdAndDate(apartment.getId(), date);
                if (availability != null) {
                    availability.setIsAvailable(true);
                    apartmentAvailabilityRepo.save(availability);
                }
            }
        } else if (bookingType == BookingType.ROOM && room != null) {
            for (LocalDate date : dates) {
                RoomAvailability availability = roomAvailabilityRepo.findByRoomIdAndDate(room.getId(), date);
                if (availability != null) {
                    availability.setIsAvailable(true);
                    roomAvailabilityRepo.save(availability);
                }
            }
        }
    }


}