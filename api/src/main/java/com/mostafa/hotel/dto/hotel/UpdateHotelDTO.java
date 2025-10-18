package com.mostafa.hotel.dto.hotel;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateHotelDTO(
        @NotNull(message = "name is required")
        @Size(min = 2, max = 200, message = "min is 2, max is 200")
        String name,

        @NotNull(message = "Description is required")
        String description,

        @NotNull(message = "Address is required")
        String address,

        @NotNull(message = "City is required")
        String city,

        @NotNull(message = "Country is required")
        String country,

        @NotNull(message = "Postal Code is required")
        String postalCode,

        @NotNull(message = "Phone Number is required")
        String phoneNumber,

        @NotNull(message = "Image is required")
        String imageUrl
) {
}
