package com.mostafa.hotel.controller;

import com.mostafa.hotel.dto.PaginatedResponse;
import com.mostafa.hotel.dto.user.UpdateUserDTO;
import com.mostafa.hotel.dto.user.UserResponseDTO;
import com.mostafa.hotel.global.GlobalResponse;
import com.mostafa.hotel.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;


    //    Update
    @PutMapping("/{userId}")
    public ResponseEntity<GlobalResponse<UserResponseDTO>> updateUser(
            @PathVariable UUID userId, @Valid @RequestBody UpdateUserDTO dto) {
        UserResponseDTO updatedUser = userService.updateUser(userId, dto);
        GlobalResponse<UserResponseDTO> res = new GlobalResponse<>(updatedUser);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Delete
    @DeleteMapping("/{userId}")
    public ResponseEntity<GlobalResponse<String>> deleteUser(@PathVariable UUID userId) {
        String deleteUser = userService.deleteByUserId(userId);
        GlobalResponse<String> res = new GlobalResponse<>(deleteUser);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get All
    @GetMapping
    public ResponseEntity<GlobalResponse<PaginatedResponse<UserResponseDTO>>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest req
    ) {
        Page<UserResponseDTO> users = userService.getAllUsers(page - 1, size);

        String baseUrl = req.getRequestURL().toString();
        String nextUrl = users.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String prevUrl = users.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<UserResponseDTO>(
                users.getContent(),
                users.getNumber() + 1,
                users.getTotalPages(),
                users.getTotalElements(),
                users.hasNext(),
                users.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }

    //    Get Single
    @GetMapping("/{userId}")
    public ResponseEntity<GlobalResponse<UserResponseDTO>> getByUserId(@PathVariable UUID userId) {
        UserResponseDTO user = userService.getByUserId(userId);
        GlobalResponse<UserResponseDTO> res = new GlobalResponse<>(user);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


}