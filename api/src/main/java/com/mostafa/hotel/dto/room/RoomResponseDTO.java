package com.mostafa.hotel.dto.room;

import com.mostafa.hotel.enums.RoomType;

import java.math.BigDecimal;
import java.util.UUID;

public record RoomResponseDTO(
        UUID id,
        String roomNumber,
        String description,
        String imageUrl,
        BigDecimal pricePerNight,
        Integer capacity,
        Boolean isAvailable,

        // Amenities
        Boolean hasWifi,
        Boolean hasAirConditioning,
        Boolean hasTv,
        Boolean hasMiniBar,
        Boolean hasBalcony,
        Boolean hasPrivateBathroom,
        Boolean bookableIndividually,


        RoomType roomType,

        // Hotel Info
        UUID hotelId,
        String hotelName,
        // Apartment Info
        UUID apartmentId,
        String apartmentName,

        // Room Status Ingo
        Boolean isPartOfApartment,
        Boolean isStandaloneRoom
) {
}
