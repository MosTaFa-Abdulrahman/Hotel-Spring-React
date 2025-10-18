package com.mostafa.hotel.dto.review;

import com.mostafa.hotel.enums.ReviewType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ReviewResponseDTO(
        UUID id,
        Integer rating,
        String comment,
        ReviewType reviewType,

        // User Info
        UUID userId,
        String userFirstName,
        String userLastName,
        String userProfileImageUrl,

        // Hotel Info
        UUID hotelId,
        String hotelName,
        String hotelImgUrl,
        String hotelAddress,
        String hotelPhoneNumber,
        BigDecimal hotelRating,

        // Apartment Info
        UUID apartmentId,
        String apartmentName,
        String apartmentImgUrl,

        // Room Info
        UUID roomId,
        String roomNumber,
        String roomImgUrl,
        Integer roomCapacity,


        UUID bookingId,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {
}
