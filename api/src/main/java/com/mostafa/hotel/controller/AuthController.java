package com.mostafa.hotel.controller;

import com.mostafa.hotel.dto.auth.LoginRequestDTO;
import com.mostafa.hotel.dto.auth.LoginResponseDto;
import com.mostafa.hotel.dto.auth.RegisterRequestDTO;
import com.mostafa.hotel.dto.user.UserResponseDTO;
import com.mostafa.hotel.global.GlobalResponse;
import com.mostafa.hotel.service.AuthService;
import com.mostafa.hotel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<GlobalResponse<String>> register(@RequestBody RegisterRequestDTO dto) {
        authService.register(dto);

        return new ResponseEntity<>(new GlobalResponse<>("Registerd Successfully"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<GlobalResponse<LoginResponseDto>> login(@RequestBody LoginRequestDTO dto) {
        Map<String, Object> loginData = authService.login(dto);

        // Safe casting with proper handling
        LoginResponseDto response = new LoginResponseDto(
                (String) loginData.get("token"),
                (UUID) loginData.get("userId"),
                (String) loginData.get("username"),
                (String) loginData.get("email")
        );

        return new ResponseEntity<>(new GlobalResponse<>(response), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<GlobalResponse<UserResponseDTO>> getCurrentUser() {
        UserResponseDTO currentUserData = userService.getCurrentUser();
        GlobalResponse<UserResponseDTO> res = new GlobalResponse<>(currentUserData);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @PostMapping("/logout")
    public ResponseEntity<GlobalResponse<String>> logout() {
        // Clear security context
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>(new GlobalResponse<>("Logged out successfully"), HttpStatus.OK);
    }


}