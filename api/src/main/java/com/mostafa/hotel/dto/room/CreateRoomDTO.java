package com.mostafa.hotel.dto.room;

import com.mostafa.hotel.enums.RoomType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateRoomDTO(
        @NotBlank(message = "Room number is required")
        @Size(max = 90, message = "Room number must not exceed 90 characters")
        String roomNumber,

        @NotBlank(message = "Description is required")
        String description,

        String imageUrl,

        @NotNull(message = "Price per night is required")
        @DecimalMin(value = "0.01", message = "Price per night must be greater than 0")
        @Digits(integer = 8, fraction = 2, message = "Price per night must have at most 8 digits and 2 decimal places")
        BigDecimal pricePerNight,

        @NotNull(message = "Capacity is required")
        @Min(value = 1, message = "Capacity must be at least 1")
        @Max(value = 10, message = "Capacity must not exceed 10")
        Integer capacity,

        // Boolean ((Amenities))
        Boolean hasWifi,
        Boolean hasAirConditioning,
        Boolean hasTv,
        Boolean hasMiniBar,
        Boolean hasBalcony,
        Boolean hasPrivateBathroom,
        Boolean bookableIndividually,


        @NotNull(message = "Room type is required")
        RoomType roomType,

        @NotNull(message = "Hotel ID is required")
        UUID hotelId,
        
        UUID apartmentId
) {
}
