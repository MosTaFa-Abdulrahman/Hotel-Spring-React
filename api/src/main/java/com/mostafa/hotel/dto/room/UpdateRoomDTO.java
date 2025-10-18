package com.mostafa.hotel.dto.room;

import com.mostafa.hotel.enums.RoomType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.UUID;

public record UpdateRoomDTO(
        @Size(max = 90, message = "Room number must not exceed 90 characters")
        String roomNumber,

        String description,

        String imageUrl,

        @DecimalMin(value = "0.01", message = "Price per night must be greater than 0")
        @Digits(integer = 8, fraction = 2, message = "Price per night must have at most 8 digits and 2 decimal places")
        BigDecimal pricePerNight,

        @Min(value = 1, message = "Capacity must be at least 1")
        @Max(value = 10, message = "Capacity must not exceed 10")
        Integer capacity,

        Boolean isAvailable,
        Boolean hasWifi,
        Boolean hasAirConditioning,
        Boolean hasTv,
        Boolean hasMiniBar,
        Boolean hasBalcony,
        Boolean hasPrivateBathroom,
        Boolean bookableIndividually,


        RoomType roomType,

        UUID hotelId,
        UUID apartmentId
) {
}
