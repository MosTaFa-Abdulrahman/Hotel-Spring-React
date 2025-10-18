package com.mostafa.hotel.service;


import com.mostafa.hotel.dto.apartment.ApartmentResponseDTO;
import com.mostafa.hotel.dto.apartment.CreateApartmentDTO;
import com.mostafa.hotel.dto.apartment.UpdateApartmentDTO;
import com.mostafa.hotel.enums.ApartmentType;
import com.mostafa.hotel.global.CustomResponseException;
import com.mostafa.hotel.mapper.EntityDtoMapper;
import com.mostafa.hotel.model.Apartment;
import com.mostafa.hotel.model.Hotel;
import com.mostafa.hotel.repository.ApartmentRepo;
import com.mostafa.hotel.repository.HotelRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class ApartmentService {
    private final ApartmentRepo apartmentRepo;
    private final HotelRepo hotelRepo;
    private final EntityDtoMapper mapper;


    //  Create
    public ApartmentResponseDTO createApartment(CreateApartmentDTO dto) {
        Hotel hotel = hotelRepo.findById(dto.hotelId())
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Hotel not found with this ID: " + dto.hotelId()));

        Apartment apartment = mapper.toApartmentEntity(dto, hotel);
        Apartment savedApartment = apartmentRepo.save(apartment);

        return mapper.toApartmentResponseDTO(savedApartment);
    }

    //  Update
    public ApartmentResponseDTO updateApartment(UUID apartmentId, UpdateApartmentDTO dto) {
        Apartment existingApartment = apartmentRepo.findById(apartmentId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Apartment not found with this ID: " + apartmentId));

        if (dto.apartmentNumber() != null) {
            existingApartment.setApartmentNumber(dto.apartmentNumber());
        }
        if (dto.description() != null) {
            existingApartment.setDescription(dto.description());
        }
        if (dto.name() != null) {
            existingApartment.setName(dto.name());
        }
        if (dto.pricePerNight() != null) {
            existingApartment.setPricePerNight(dto.pricePerNight());
        }
        if (dto.totalCapacity() != null) {
            existingApartment.setTotalCapacity(dto.totalCapacity());
        }
        if (dto.numberOfBedrooms() != null) {
            existingApartment.setNumberOfBedrooms(dto.numberOfBedrooms());
        }
        if (dto.numberOfBathrooms() != null) {
            existingApartment.setNumberOfBathrooms(dto.numberOfBathrooms());
        }
        if (dto.imageUrl() != null) {
            existingApartment.setImageUrl(dto.imageUrl());
        }
        if (dto.floorNumber() != null) {
            existingApartment.setFloorNumber(dto.floorNumber());
        }
        if (dto.areaSqm() != null) {
            existingApartment.setAreaSqm(dto.areaSqm());
        }
        if (dto.isAvailable() != null) {
            existingApartment.setIsAvailable(dto.isAvailable());
        }
        if (dto.roomsBookableSeparately() != null) {
            existingApartment.setRoomsBookableSeparately(dto.roomsBookableSeparately());
        }
        if (dto.hasKitchen() != null) {
            existingApartment.setHasKitchen(dto.hasKitchen());
        }
        if (dto.hasLivingRoom() != null) {
            existingApartment.setHasLivingRoom(dto.hasLivingRoom());
        }
        if (dto.hasDiningArea() != null) {
            existingApartment.setHasDiningArea(dto.hasDiningArea());
        }
        if (dto.hasBalcony() != null) {
            existingApartment.setHasBalcony(dto.hasBalcony());
        }
        if (dto.hasWifi() != null) {
            existingApartment.setHasWifi(dto.hasWifi());
        }
        if (dto.hasAirConditioning() != null) {
            existingApartment.setHasAirConditioning(dto.hasAirConditioning());
        }
        if (dto.hasParking() != null) {
            existingApartment.setHasParking(dto.hasParking());
        }
        if (dto.hasLaundry() != null) {
            existingApartment.setHasLaundry(dto.hasLaundry());
        }
        if (dto.apartmentType() != null) {
            existingApartment.setApartmentType(dto.apartmentType());
        }


        Apartment updatedApartment = apartmentRepo.save(existingApartment);

        return mapper.toApartmentResponseDTO(updatedApartment);
    }


    //  Delete
    public String deleteApartment(UUID apartmentId) {
        Apartment apartment = apartmentRepo.findById(apartmentId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Apartment not found with this ID: " + apartmentId));

        apartmentRepo.delete(apartment);

        return "Apartment Deleted Success 🤞";
    }

    //  Get Single
    public ApartmentResponseDTO getApartment(UUID apartmentId) {
        Apartment apartment = apartmentRepo.findById(apartmentId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Apartment not found with this ID: " + apartmentId));

        return mapper.toApartmentResponseDTO(apartment);
    }

    //    Get All
    public Page<ApartmentResponseDTO> getAllWithSearch(
            String apartmentNumber,
            String name,
            ApartmentType apartmentType,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            Integer maxCapacity,
            Integer minBedrooms,
            Integer maxBedrooms,
            Integer minBathrooms,
            Integer maxBathrooms,
            Integer floorNumber,
            BigDecimal minArea,
            BigDecimal maxArea,
            Boolean isAvailable,
            Boolean roomsBookableSeparately,
            Boolean hasKitchen,
            Boolean hasLivingRoom,
            Boolean hasDiningArea,
            Boolean hasBalcony,
            Boolean hasWifi,
            Boolean hasAirConditioning,
            Boolean hasParking,
            Boolean hasLaundry,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Apartment> apartmentsPage = apartmentRepo.advancedSearchAll(
                apartmentNumber,
                name,
                apartmentType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                minBedrooms,
                maxBedrooms,
                minBathrooms,
                maxBathrooms,
                floorNumber,
                minArea,
                maxArea,
                isAvailable,
                roomsBookableSeparately,
                hasKitchen,
                hasLivingRoom,
                hasDiningArea,
                hasBalcony,
                hasWifi,
                hasAirConditioning,
                hasParking,
                hasLaundry,
                pageable
        );

        return apartmentsPage.map(mapper::toApartmentResponseDTO);
    }


    // ***************************** ((Specifications)) *********************** //
    //    Get All For ((Specific-Hotel)) with ((Advanced-Search 🤞))
    public Page<ApartmentResponseDTO> getAllForHotelWithSearch(
            UUID hotelId,
            String apartmentNumber,
            String name,
            ApartmentType apartmentType,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            Integer maxCapacity,
            Integer minBedrooms,
            Integer maxBedrooms,
            Integer minBathrooms,
            Integer maxBathrooms,
            Integer floorNumber,
            BigDecimal minArea,
            BigDecimal maxArea,
            Boolean isAvailable,
            Boolean roomsBookableSeparately,
            Boolean hasKitchen,
            Boolean hasLivingRoom,
            Boolean hasDiningArea,
            Boolean hasBalcony,
            Boolean hasWifi,
            Boolean hasAirConditioning,
            Boolean hasParking,
            Boolean hasLaundry,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Apartment> apartmentsPage = apartmentRepo.advancedSearch(
                hotelId,
                apartmentNumber,
                name,
                apartmentType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                minBedrooms,
                maxBedrooms,
                minBathrooms,
                maxBathrooms,
                floorNumber,
                minArea,
                maxArea,
                isAvailable,
                roomsBookableSeparately,
                hasKitchen,
                hasLivingRoom,
                hasDiningArea,
                hasBalcony,
                hasWifi,
                hasAirConditioning,
                hasParking,
                hasLaundry,
                pageable
        );

        return apartmentsPage.map(mapper::toApartmentResponseDTO);
    }


}
