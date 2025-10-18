package com.mostafa.hotel.dto.apartment;

import com.mostafa.hotel.enums.ApartmentType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record UpdateApartmentDTO(
        @Size(max = 90, message = "Apartment number must not exceed 90 characters")
        String apartmentNumber,

        @Size(max = 300, message = "Name must not exceed 300 characters")
        String name,

        @Size(max = 1000, message = "Description must not exceed 1000 characters")
        String description,

        String imageUrl,

        @DecimalMin(value = "0.01", message = "Price per night must be greater than 0")
        BigDecimal pricePerNight,

        @Min(value = 1, message = "Total capacity must be at least 1")
        @Max(value = 20, message = "Total capacity must not exceed 20")
        Integer totalCapacity,

        @Min(value = 0, message = "Number of bedrooms cannot be negative")
        @Max(value = 10, message = "Number of bedrooms must not exceed 10")
        Integer numberOfBedrooms,

        @Min(value = 1, message = "Number of bathrooms must be at least 1")
        @Max(value = 10, message = "Number of bathrooms must not exceed 10")
        Integer numberOfBathrooms,

        @Min(value = 0, message = "Floor number cannot be negative")
        @Max(value = 100, message = "Floor number must not exceed 100")
        Integer floorNumber,

        @DecimalMin(value = "0.01", message = "Area must be greater than 0")
        BigDecimal areaSqm,


        // Booleans
        Boolean isAvailable,
        Boolean roomsBookableSeparately,
        Boolean hasKitchen,
        Boolean hasLivingRoom,
        Boolean hasDiningArea,
        Boolean hasBalcony,
        Boolean hasWifi,
        Boolean hasAirConditioning,
        Boolean hasParking,
        Boolean hasLaundry,


        ApartmentType apartmentType
) {
}
