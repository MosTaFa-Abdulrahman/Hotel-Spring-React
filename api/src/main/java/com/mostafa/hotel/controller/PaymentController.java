package com.mostafa.hotel.controller;


import com.mostafa.hotel.dto.PaginatedResponse;
import com.mostafa.hotel.dto.payment.CreatePaymentDTO;
import com.mostafa.hotel.dto.payment.PayShortageDTO;
import com.mostafa.hotel.dto.payment.PaymentResponseDTO;
import com.mostafa.hotel.global.GlobalResponse;
import com.mostafa.hotel.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;


    //    Create
    @PostMapping
    public ResponseEntity<GlobalResponse<PaymentResponseDTO>> createPayment(
            @Valid @RequestBody CreatePaymentDTO dto) {
        PaymentResponseDTO createdPayment = paymentService.createPayment(dto);
        GlobalResponse<PaymentResponseDTO> res = new GlobalResponse<>(createdPayment);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    //    Pay Shortage
    @PatchMapping("/{paymentId}/pay-shortage")
    public ResponseEntity<GlobalResponse<PaymentResponseDTO>> payShortage(
            @PathVariable UUID paymentId,
            @Valid @RequestBody PayShortageDTO dto) {
        PaymentResponseDTO updatedPayment = paymentService.payShortage(paymentId, dto);
        GlobalResponse<PaymentResponseDTO> res = new GlobalResponse<>(updatedPayment);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get Single By ((paymentId))
    @GetMapping("/{paymentId}")
    public ResponseEntity<GlobalResponse<PaymentResponseDTO>> getPaymentById(
            @PathVariable UUID paymentId) {
        PaymentResponseDTO payment = paymentService.getPaymentById(paymentId);
        GlobalResponse<PaymentResponseDTO> res = new GlobalResponse<>(payment);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    // Get All for ((Current-User))
    @GetMapping("/current-user")
    public ResponseEntity<GlobalResponse<PaginatedResponse<PaymentResponseDTO>>> getAllForCurrentUser(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest req
    ) {
        Page<PaymentResponseDTO> payments = paymentService.getMyPayments(page - 1, size);

        String baseUrl = req.getRequestURL().toString();
        String nextUrl = payments.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String prevUrl = payments.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<PaymentResponseDTO>(
                payments.getContent(),
                payments.getNumber() + 1,
                payments.getTotalPages(),
                payments.getTotalElements(),
                payments.hasNext(),
                payments.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


    // Get All for ((Specific-User))
    @GetMapping("/user/{userId}")
    public ResponseEntity<GlobalResponse<PaginatedResponse<PaymentResponseDTO>>> getAllForCurrentUser(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest req
    ) {
        Page<PaymentResponseDTO> payments = paymentService.getUserPayments(userId, page - 1, size);

        String baseUrl = req.getRequestURL().toString();
        String nextUrl = payments.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String prevUrl = payments.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<PaymentResponseDTO>(
                payments.getContent(),
                payments.getNumber() + 1,
                payments.getTotalPages(),
                payments.getTotalElements(),
                payments.hasNext(),
                payments.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }

    // Get All for ((ADMIN && MANAGER))
    @GetMapping
    public ResponseEntity<GlobalResponse<PaginatedResponse<PaymentResponseDTO>>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest req
    ) {
        Page<PaymentResponseDTO> payments = paymentService.getAllPayments(page - 1, size);

        String baseUrl = req.getRequestURL().toString();
        String nextUrl = payments.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String prevUrl = payments.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<PaymentResponseDTO>(
                payments.getContent(),
                payments.getNumber() + 1,
                payments.getTotalPages(),
                payments.getTotalElements(),
                payments.hasNext(),
                payments.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


}
