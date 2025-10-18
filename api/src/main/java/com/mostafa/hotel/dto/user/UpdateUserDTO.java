package com.mostafa.hotel.dto.user;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateUserDTO(
        @Size(max = 50, message = "First name cannot exceed 50 characters")
        String firstName,

        @Size(max = 50, message = "Last name cannot exceed 50 characters")
        String lastName,

        @Pattern(
                regexp = "^(010|011|012|015)[0-9]{8}$",
                message = "Phone number must be a valid Egyptian number (010/011/012/015)"
        )
        String phoneNumber,

        @Size(max = 255, message = "Profile image URL cannot exceed 255 characters")
        String profileImageUrl
) {
}
