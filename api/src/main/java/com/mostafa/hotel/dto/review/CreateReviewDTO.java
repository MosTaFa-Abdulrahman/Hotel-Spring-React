package com.mostafa.hotel.dto.review;

import com.mostafa.hotel.enums.ReviewType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;


public record CreateReviewDTO(
        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating must not exceed 5")
        Integer rating,

        @Size(max = 4000, message = "Comment must not exceed 4000 characters")
        String comment,


        @NotNull(message = "Review type is required")
        ReviewType reviewType,


        @NotNull(message = "Hotel ID is required")
        UUID hotelId,

        UUID apartmentId,

        UUID roomId,

        @NotNull(message = "Booking ID is required")
        UUID bookingId
) {
}
