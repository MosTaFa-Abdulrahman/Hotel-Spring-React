package com.mostafa.hotel.service;


import com.mostafa.hotel.dto.hotel.CreateHotelDTO;
import com.mostafa.hotel.dto.hotel.HotelResponseDTO;
import com.mostafa.hotel.dto.hotel.UpdateHotelDTO;
import com.mostafa.hotel.global.CustomResponseException;
import com.mostafa.hotel.mapper.EntityDtoMapper;
import com.mostafa.hotel.model.Hotel;
import com.mostafa.hotel.repository.HotelRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepo hotelRepo;
    private final EntityDtoMapper mapper;


    //  Create
    public HotelResponseDTO createHotel(CreateHotelDTO dto) {
        if (hotelRepo.existsByEmail(dto.email())) {
            throw new CustomResponseException("Hotel with email '" + dto.email() + "' already exists", 409);
        }

        Hotel hotel = mapper.toHotelEntity(dto);

        Hotel savedHotel = hotelRepo.save(hotel);

        return mapper.toHotelResponseDTO(savedHotel);
    }

    //  Update
    public HotelResponseDTO updateHotel(UUID hotelId, UpdateHotelDTO dto) {
        Hotel existingHotel = hotelRepo.findById(hotelId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Hotel not found with this ID: " + hotelId));

        if (dto.name() != null) {
            existingHotel.setName(dto.name());
        }
        if (dto.description() != null) {
            existingHotel.setDescription(dto.description());
        }
        if (dto.address() != null) {
            existingHotel.setAddress(dto.address());
        }
        if (dto.city() != null) {
            existingHotel.setCity(dto.city());
        }
        if (dto.country() != null) {
            existingHotel.setCountry(dto.country());
        }
        if (dto.postalCode() != null) {
            existingHotel.setPostalCode(dto.postalCode());
        }
        if (dto.phoneNumber() != null) {
            existingHotel.setPhoneNumber(dto.phoneNumber());
        }
        if (dto.imageUrl() != null) {
            existingHotel.setImageUrl(dto.imageUrl());
        }


        Hotel updatedHotel = hotelRepo.save(existingHotel);

        return mapper.toHotelResponseDTO(updatedHotel);
    }


    //  Delete
    public String deleteHotel(UUID hotelId) {
        Hotel hotel = hotelRepo.findById(hotelId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Hotel not found with this ID: " + hotelId));

        hotelRepo.delete(hotel);

        return "Hotel Deleted Success 🤞";
    }

    //  Get Single
    public HotelResponseDTO getHotel(UUID hotelId) {
        Hotel hotel = hotelRepo.findById(hotelId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Hotel not found with this ID: " + hotelId));

        return mapper.toHotelResponseDTO(hotel);
    }

    //    Get All
    public Page<HotelResponseDTO> getAllHotels(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Hotel> hotelsPage = hotelRepo.findAll(pageable);

        // Convert Page<Hotel> to Page<HotelResponseDTO>
        return hotelsPage.map(mapper::toHotelResponseDTO);
    }


    // ***************************** ((Specifications)) *********************** //
    //    Big Search
    public Page<HotelResponseDTO> searchHotels(
            String name,
            String city,
            String country,
            String phoneNumber,
            Boolean isActive,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Hotel> hotelsPage = hotelRepo.advancedSearch(name, city, country, phoneNumber, isActive, pageable);

        return hotelsPage.map(mapper::toHotelResponseDTO);
    }


}
