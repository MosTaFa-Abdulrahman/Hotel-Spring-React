package com.mostafa.hotel.dto.apartment;

import com.mostafa.hotel.enums.ApartmentType;

import java.math.BigDecimal;
import java.util.UUID;

public record ApartmentResponseDTO(
        UUID id,
        String apartmentNumber,
        String name,
        String description,
        String imageUrl,
        BigDecimal pricePerNight,
        Integer totalCapacity,
        Integer numberOfBedrooms,
        Integer numberOfBathrooms,
        Integer floorNumber,
        BigDecimal areaSqm,
        Boolean isAvailable,
        Boolean roomsBookableSeparately,

        // Amenities
        Boolean hasKitchen,
        Boolean hasLivingRoom,
        Boolean hasDiningArea,
        Boolean hasBalcony,
        Boolean hasWifi,
        Boolean hasAirConditioning,
        Boolean hasParking,
        Boolean hasLaundry,


        ApartmentType apartmentType,

        // Hotel
        UUID hotelId,
        String hotelName
) {
}
