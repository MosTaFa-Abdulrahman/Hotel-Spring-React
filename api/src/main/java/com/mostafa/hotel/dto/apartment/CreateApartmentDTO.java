package com.mostafa.hotel.dto.apartment;

import com.mostafa.hotel.enums.ApartmentType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateApartmentDTO(
        @NotBlank(message = "Apartment number is required")
        @Size(max = 90, message = "Apartment number must not exceed 90 characters")
        String apartmentNumber,

        @NotBlank(message = "Name is required")
        @Size(max = 300, message = "Name must not exceed 300 characters")
        String name,

        @NotBlank(message = "Description is required")
        String description,

        @Size(max = 255, message = "Image URL must not exceed 255 characters")
        String imageUrl,

        @NotNull(message = "Price per night is required")
        @DecimalMin(value = "0.01", message = "Price per night must be greater than 0")
        BigDecimal pricePerNight,

        @NotNull(message = "Total capacity is required")
        @Min(value = 1, message = "Total capacity must be at least 1")
        @Max(value = 20, message = "Total capacity must not exceed 20")
        Integer totalCapacity,

        @NotNull(message = "Number of bedrooms is required")
        @Min(value = 0, message = "Number of bedrooms cannot be negative")
        @Max(value = 10, message = "Number of bedrooms must not exceed 10")
        Integer numberOfBedrooms,

        @NotNull(message = "Number of bathrooms is required")
        @Min(value = 1, message = "Number of bathrooms must be at least 1")
        @Max(value = 10, message = "Number of bathrooms must not exceed 10")
        Integer numberOfBathrooms,

        @Min(value = 0, message = "Floor number cannot be negative")
        @Max(value = 100, message = "Floor number must not exceed 100")
        Integer floorNumber,

        @DecimalMin(value = "0.01", message = "Area must be greater than 0")
        @Digits(integer = 6, fraction = 2, message = "Area must have at most 6 digits and 2 decimal places")
        BigDecimal areaSqm,

        // Boolean
        Boolean roomsBookableSeparately,
        Boolean hasKitchen,
        Boolean hasLivingRoom,
        Boolean hasDiningArea,
        Boolean hasBalcony,
        Boolean hasWifi,
        Boolean hasAirConditioning,
        Boolean hasParking,
        Boolean hasLaundry,

        @NotNull(message = "Apartment type is required")
        ApartmentType apartmentType,

        @NotNull(message = "Hotel ID is required")
        UUID hotelId
) {
}
