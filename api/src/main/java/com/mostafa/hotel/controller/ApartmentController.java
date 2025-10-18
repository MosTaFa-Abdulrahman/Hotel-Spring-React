package com.mostafa.hotel.controller;


import com.mostafa.hotel.dto.PaginatedResponse;
import com.mostafa.hotel.dto.apartment.ApartmentResponseDTO;
import com.mostafa.hotel.dto.apartment.CreateApartmentDTO;
import com.mostafa.hotel.dto.apartment.UpdateApartmentDTO;
import com.mostafa.hotel.enums.ApartmentType;
import com.mostafa.hotel.global.GlobalResponse;
import com.mostafa.hotel.service.ApartmentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/apartments")
public class ApartmentController {
    private final ApartmentService apartmentService;


    //    Create
    @PostMapping
    public ResponseEntity<GlobalResponse<ApartmentResponseDTO>> createApartment(
            @Valid @RequestBody CreateApartmentDTO dto) {
        ApartmentResponseDTO createdApartment = apartmentService.createApartment(dto);
        GlobalResponse<ApartmentResponseDTO> res = new GlobalResponse<>(createdApartment);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    //    Update By (apartmentId)
    @PutMapping("/{apartmentId}")
    public ResponseEntity<GlobalResponse<ApartmentResponseDTO>> updateApartment(
            @PathVariable UUID apartmentId,
            @Valid @RequestBody UpdateApartmentDTO dto) {
        ApartmentResponseDTO updatedApartment = apartmentService.updateApartment(apartmentId, dto);
        GlobalResponse<ApartmentResponseDTO> res = new GlobalResponse<>(updatedApartment);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Delete By (apartmentId)
    @DeleteMapping("/{apartmentId}")
    public ResponseEntity<GlobalResponse<String>> deleteHotel(@PathVariable UUID apartmentId) {
        String deletedApartment = apartmentService.deleteApartment(apartmentId);
        GlobalResponse<String> res = new GlobalResponse<>(deletedApartment);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get Single By (hotelId)
    @GetMapping("/{apartmentId}")
    public ResponseEntity<GlobalResponse<ApartmentResponseDTO>> getHotel(
            @PathVariable UUID apartmentId) {
        ApartmentResponseDTO apartment = apartmentService.getApartment(apartmentId);
        GlobalResponse<ApartmentResponseDTO> res = new GlobalResponse<>(apartment);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get All
    @GetMapping
    public ResponseEntity<GlobalResponse<PaginatedResponse<ApartmentResponseDTO>>> getAll(
            @RequestParam(required = false) String apartmentNumber,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) ApartmentType apartmentType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Integer maxCapacity,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer maxBedrooms,
            @RequestParam(required = false) Integer minBathrooms,
            @RequestParam(required = false) Integer maxBathrooms,
            @RequestParam(required = false) Integer floorNumber,
            @RequestParam(required = false) BigDecimal minArea,
            @RequestParam(required = false) BigDecimal maxArea,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) Boolean roomsBookableSeparately,
            @RequestParam(required = false) Boolean hasKitchen,
            @RequestParam(required = false) Boolean hasLivingRoom,
            @RequestParam(required = false) Boolean hasDiningArea,
            @RequestParam(required = false) Boolean hasBalcony,
            @RequestParam(required = false) Boolean hasWifi,
            @RequestParam(required = false) Boolean hasAirConditioning,
            @RequestParam(required = false) Boolean hasParking,
            @RequestParam(required = false) Boolean hasLaundry,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "pricePerNight") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction,
            HttpServletRequest req
    ) {
        Page<ApartmentResponseDTO> apartments = apartmentService.getAllWithSearch(
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
                page - 1,
                size,
                sortBy,
                direction
        );

        String baseUrl = req.getRequestURL().toString();

        // Build query params for pagination URLs
        StringBuilder queryParams = new StringBuilder();
        if (apartmentNumber != null) queryParams.append("&apartmentNumber=").append(apartmentNumber);
        if (name != null) queryParams.append("&name=").append(name);
        if (apartmentType != null) queryParams.append("&apartmentType=").append(apartmentType);
        if (minPrice != null) queryParams.append("&minPrice=").append(minPrice);
        if (maxPrice != null) queryParams.append("&maxPrice=").append(maxPrice);
        if (minCapacity != null) queryParams.append("&minCapacity=").append(minCapacity);
        if (maxCapacity != null) queryParams.append("&maxCapacity=").append(maxCapacity);
        if (minBedrooms != null) queryParams.append("&minBedrooms=").append(minBedrooms);
        if (maxBedrooms != null) queryParams.append("&maxBedrooms=").append(maxBedrooms);
        if (minBathrooms != null) queryParams.append("&minBathrooms=").append(minBathrooms);
        if (maxBathrooms != null) queryParams.append("&maxBathrooms=").append(maxBathrooms);
        if (floorNumber != null) queryParams.append("&floorNumber=").append(floorNumber);
        if (minArea != null) queryParams.append("&minArea=").append(minArea);
        if (maxArea != null) queryParams.append("&maxArea=").append(maxArea);
        if (isAvailable != null) queryParams.append("&isAvailable=").append(isAvailable);
        if (roomsBookableSeparately != null)
            queryParams.append("&roomsBookableSeparately=").append(roomsBookableSeparately);
        if (hasKitchen != null) queryParams.append("&hasKitchen=").append(hasKitchen);
        if (hasLivingRoom != null) queryParams.append("&hasLivingRoom=").append(hasLivingRoom);
        if (hasDiningArea != null) queryParams.append("&hasDiningArea=").append(hasDiningArea);
        if (hasBalcony != null) queryParams.append("&hasBalcony=").append(hasBalcony);
        if (hasWifi != null) queryParams.append("&hasWifi=").append(hasWifi);
        if (hasAirConditioning != null) queryParams.append("&hasAirConditioning=").append(hasAirConditioning);
        if (hasParking != null) queryParams.append("&hasParking=").append(hasParking);
        if (hasLaundry != null) queryParams.append("&hasLaundry=").append(hasLaundry);
        queryParams.append("&size=").append(size);
        queryParams.append("&sortBy=").append(sortBy);
        queryParams.append("&direction=").append(direction);

        String nextUrl = apartments.hasNext()
                ? String.format("%s?page=%d%s", baseUrl, page + 1, queryParams)
                : null;
        String prevUrl = apartments.hasPrevious()
                ? String.format("%s?page=%d%s", baseUrl, page - 1, queryParams)
                : null;

        var paginatedResponse = new PaginatedResponse<>(
                apartments.getContent(),
                apartments.getNumber() + 1,
                apartments.getTotalPages(),
                apartments.getTotalElements(),
                apartments.hasNext(),
                apartments.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


    // ***************************** ((Specifications)) *********************** //
    //    Get All For ((Specific-Hotel)) with ((Advanced-Search 🤞))
    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<GlobalResponse<PaginatedResponse<ApartmentResponseDTO>>> getAllForHotel(
            @PathVariable UUID hotelId,
            @RequestParam(required = false) String apartmentNumber,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) ApartmentType apartmentType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Integer maxCapacity,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer maxBedrooms,
            @RequestParam(required = false) Integer minBathrooms,
            @RequestParam(required = false) Integer maxBathrooms,
            @RequestParam(required = false) Integer floorNumber,
            @RequestParam(required = false) BigDecimal minArea,
            @RequestParam(required = false) BigDecimal maxArea,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) Boolean roomsBookableSeparately,
            @RequestParam(required = false) Boolean hasKitchen,
            @RequestParam(required = false) Boolean hasLivingRoom,
            @RequestParam(required = false) Boolean hasDiningArea,
            @RequestParam(required = false) Boolean hasBalcony,
            @RequestParam(required = false) Boolean hasWifi,
            @RequestParam(required = false) Boolean hasAirConditioning,
            @RequestParam(required = false) Boolean hasParking,
            @RequestParam(required = false) Boolean hasLaundry,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "pricePerNight") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction,
            HttpServletRequest req
    ) {
        Page<ApartmentResponseDTO> apartments = apartmentService.getAllForHotelWithSearch(
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
                page - 1,
                size,
                sortBy,
                direction
        );

        String baseUrl = req.getRequestURL().toString();

        // Build query params for pagination URLs
        StringBuilder queryParams = new StringBuilder();
        if (apartmentNumber != null) queryParams.append("&apartmentNumber=").append(apartmentNumber);
        if (name != null) queryParams.append("&name=").append(name);
        if (apartmentType != null) queryParams.append("&apartmentType=").append(apartmentType);
        if (minPrice != null) queryParams.append("&minPrice=").append(minPrice);
        if (maxPrice != null) queryParams.append("&maxPrice=").append(maxPrice);
        if (minCapacity != null) queryParams.append("&minCapacity=").append(minCapacity);
        if (maxCapacity != null) queryParams.append("&maxCapacity=").append(maxCapacity);
        if (minBedrooms != null) queryParams.append("&minBedrooms=").append(minBedrooms);
        if (maxBedrooms != null) queryParams.append("&maxBedrooms=").append(maxBedrooms);
        if (minBathrooms != null) queryParams.append("&minBathrooms=").append(minBathrooms);
        if (maxBathrooms != null) queryParams.append("&maxBathrooms=").append(maxBathrooms);
        if (floorNumber != null) queryParams.append("&floorNumber=").append(floorNumber);
        if (minArea != null) queryParams.append("&minArea=").append(minArea);
        if (maxArea != null) queryParams.append("&maxArea=").append(maxArea);
        if (isAvailable != null) queryParams.append("&isAvailable=").append(isAvailable);
        if (roomsBookableSeparately != null)
            queryParams.append("&roomsBookableSeparately=").append(roomsBookableSeparately);
        if (hasKitchen != null) queryParams.append("&hasKitchen=").append(hasKitchen);
        if (hasLivingRoom != null) queryParams.append("&hasLivingRoom=").append(hasLivingRoom);
        if (hasDiningArea != null) queryParams.append("&hasDiningArea=").append(hasDiningArea);
        if (hasBalcony != null) queryParams.append("&hasBalcony=").append(hasBalcony);
        if (hasWifi != null) queryParams.append("&hasWifi=").append(hasWifi);
        if (hasAirConditioning != null) queryParams.append("&hasAirConditioning=").append(hasAirConditioning);
        if (hasParking != null) queryParams.append("&hasParking=").append(hasParking);
        if (hasLaundry != null) queryParams.append("&hasLaundry=").append(hasLaundry);
        queryParams.append("&size=").append(size);
        queryParams.append("&sortBy=").append(sortBy);
        queryParams.append("&direction=").append(direction);

        String nextUrl = apartments.hasNext()
                ? String.format("%s?page=%d%s", baseUrl, page + 1, queryParams)
                : null;
        String prevUrl = apartments.hasPrevious()
                ? String.format("%s?page=%d%s", baseUrl, page - 1, queryParams)
                : null;

        var paginatedResponse = new PaginatedResponse<>(
                apartments.getContent(),
                apartments.getNumber() + 1,
                apartments.getTotalPages(),
                apartments.getTotalElements(),
                apartments.hasNext(),
                apartments.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


}
