package com.mostafa.hotel.dto.booking;

import com.mostafa.hotel.enums.BookingType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CreateBookingDTO(
        @NotNull(message = "Check-in date is required")
        @Future(message = "Check-in date must be in the future")
        LocalDate checkInDate,

        @NotNull(message = "Check-out date is required")
        @Future(message = "Check-out date must be in the future")
        LocalDate checkOutDate,

        @NotNull(message = "Number of guests is required")
        @Min(value = 1, message = "Number of guests must be at least 1")
        @Max(value = 50, message = "Number of guests must not exceed 50")
        Integer numberOfGuests,

        @NotNull(message = "Booking type is required")
        BookingType bookingType,

        @NotNull(message = "User ID is required")
        UUID userId,

        @NotNull(message = "Hotel ID is required")
        UUID hotelId,

        // Optional - for apartment bookings
        UUID apartmentId,

        // Optional - for room bookings
        UUID roomId
) {
}
