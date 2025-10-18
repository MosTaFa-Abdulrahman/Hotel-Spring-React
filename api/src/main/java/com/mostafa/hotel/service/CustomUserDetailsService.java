package com.mostafa.hotel.service;

import com.mostafa.hotel.model.User;
import com.mostafa.hotel.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Optional<User> userAccount = userRepo.findByEmail(userEmail);
        if (userAccount.isEmpty()) {
            throw new UsernameNotFoundException("User not found with this Email: " + userEmail);
        }

        return userAccount.get();
    }


}