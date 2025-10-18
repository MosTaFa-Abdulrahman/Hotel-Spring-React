package com.mostafa.hotel.dto.user;

import com.mostafa.hotel.enums.UserRole;

import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String username,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String profileImageUrl,
        UserRole role
) {
}
