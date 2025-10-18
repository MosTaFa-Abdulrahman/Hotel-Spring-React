package com.mostafa.hotel.dto.booking;

import com.mostafa.hotel.enums.BookingStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;


public record UpdateBookingDTO(
        @Future(message = "Check-in date must be in the future")
        LocalDate checkInDate,

        @Future(message = "Check-out date must be in the future")
        LocalDate checkOutDate,

        @Min(value = 1, message = "Number of guests must be at least 1")
        @Max(value = 50, message = "Number of guests must not exceed 50")
        Integer numberOfGuests,

        @DecimalMin(value = "0.01", message = "Total amount must be greater than 0")
        @Digits(integer = 10, fraction = 2, message = "Total amount must have at most 10 digits and 2 decimal places")
        BigDecimal totalAmount,

        BookingStatus status
) {
}
