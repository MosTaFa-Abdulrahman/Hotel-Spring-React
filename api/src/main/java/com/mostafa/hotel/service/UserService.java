package com.mostafa.hotel.service;

import com.mostafa.hotel.dto.user.UpdateUserDTO;
import com.mostafa.hotel.dto.user.UserResponseDTO;
import com.mostafa.hotel.global.CustomResponseException;
import com.mostafa.hotel.mapper.EntityDtoMapper;
import com.mostafa.hotel.model.User;
import com.mostafa.hotel.repository.UserRepo;
import com.mostafa.hotel.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final EntityDtoMapper mapper;
    private final CurrentUser currentUser;


    //    Update
    public UserResponseDTO updateUser(UUID userId, UpdateUserDTO dto) {
        User existingUser = userRepo.findById(userId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("User Not Found with This ID:  " + userId));

        existingUser.setFirstName(dto.firstName());
        existingUser.setLastName(dto.lastName());
        existingUser.setPhoneNumber(dto.phoneNumber());
        existingUser.setProfileImageUrl(dto.profileImageUrl());

        User updatedUser = userRepo.save(existingUser);

        return mapper.toUserResponseDTO(updatedUser);
    }

    //    Delete ((userId))
    public String deleteByUserId(UUID userId) {
        userRepo.findById(userId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("User Not Found with This ID:  " + userId));

        userRepo.deleteById(userId);
        return "User Deleted Success with this ID: " + userId;
    }

    //    Get All
    public Page<UserResponseDTO> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userRepo.findAll(pageable);

        return usersPage.map(mapper::toUserResponseDTO);
    }

    //    Get By ((userId)
    public UserResponseDTO getByUserId(UUID userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("User Not Found with This ID:  " + userId));

        return mapper.toUserResponseDTO(user);
    }


    //  ********************************* ((Specifications)) ******************************** //
    // Get currentUser
    public UserResponseDTO getCurrentUser() {
        User authUser = currentUser.getCurrentUser();
        
        return mapper.toUserResponseDTO(authUser);
    }


}
