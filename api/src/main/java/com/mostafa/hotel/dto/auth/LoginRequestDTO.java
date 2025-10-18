package com.mostafa.hotel.dto.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public record LoginRequestDTO(
        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        String email,

        @NotNull(message = "password is required")
        @Size(min = 6, max = 50, message = "min is 6, max is 50")
        String password
) {
}
