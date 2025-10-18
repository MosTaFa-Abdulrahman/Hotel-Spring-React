package com.mostafa.hotel.dto.payment;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;


public record PayShortageDTO(
        @NotNull(message = "Shortage amount is required")
        @DecimalMin(value = "0.01", message = "Shortage amount must be greater than 0")
        BigDecimal shortageAmount

) {
}
