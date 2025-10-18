package com.mostafa.hotel.dto.payment;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;


public record CreatePaymentDTO(
        @NotNull(message = "Booking ID is required")
        UUID bookingId,

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
        @Digits(integer = 10, fraction = 2, message = "Amount must have at most 10 digits and 2 decimal places")
        BigDecimal amount,

        String notes
) {
}
