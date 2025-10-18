package com.mostafa.hotel.dto.hotel;

import java.math.BigDecimal;
import java.util.UUID;

public record HotelResponseDTO(
        UUID id,
        String email,
        String name,
        String description,
        String address,
        String city,
        String country,
        String postalCode,
        String phoneNumber,
        String imageUrl,
        BigDecimal rating,
        Boolean isActive
) {
}
