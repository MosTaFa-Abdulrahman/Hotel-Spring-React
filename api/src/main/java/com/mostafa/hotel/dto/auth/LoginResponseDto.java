package com.mostafa.hotel.dto.auth;

import java.util.UUID;

public record LoginResponseDto(
        String token,
        UUID userId,
        String username,
        String email
) {
}
