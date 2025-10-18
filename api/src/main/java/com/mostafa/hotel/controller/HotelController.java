package com.mostafa.hotel.controller;


import com.mostafa.hotel.dto.PaginatedResponse;
import com.mostafa.hotel.dto.hotel.CreateHotelDTO;
import com.mostafa.hotel.dto.hotel.HotelResponseDTO;
import com.mostafa.hotel.dto.hotel.UpdateHotelDTO;
import com.mostafa.hotel.global.GlobalResponse;
import com.mostafa.hotel.service.HotelService;
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
@RequestMapping("/api/hotels")
public class HotelController {
    private final HotelService hotelService;


    //    Create
    @PostMapping
    public ResponseEntity<GlobalResponse<HotelResponseDTO>> createHotel(
            @Valid @RequestBody CreateHotelDTO dto) {
        HotelResponseDTO createdHotel = hotelService.createHotel(dto);
        GlobalResponse<HotelResponseDTO> res = new GlobalResponse<>(createdHotel);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    //    Update By (hotelId)
    @PutMapping("/{hotelId}")
    public ResponseEntity<GlobalResponse<HotelResponseDTO>> updateHotel(
            @PathVariable UUID hotelId,
            @Valid @RequestBody UpdateHotelDTO dto) {
        HotelResponseDTO updatedHotel = hotelService.updateHotel(hotelId, dto);
        GlobalResponse<HotelResponseDTO> res = new GlobalResponse<>(updatedHotel);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Delete By (hotelId)
    @DeleteMapping("/{hotelId}")
    public ResponseEntity<GlobalResponse<String>> deleteHotel(@PathVariable UUID hotelId) {
        String deletedHotel = hotelService.deleteHotel(hotelId);
        GlobalResponse<String> res = new GlobalResponse<>(deletedHotel);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get Single By (hotelId)
    @GetMapping("/{hotelId}")
    public ResponseEntity<GlobalResponse<HotelResponseDTO>> getHotel(
            @PathVariable UUID hotelId) {
        HotelResponseDTO hotel = hotelService.getHotel(hotelId);
        GlobalResponse<HotelResponseDTO> res = new GlobalResponse<>(hotel);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get All
    @GetMapping
    public ResponseEntity<GlobalResponse<PaginatedResponse<HotelResponseDTO>>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest req
    ) {
        Page<HotelResponseDTO> hotels = hotelService.getAllHotels(page - 1, size);

        String baseUrl = req.getRequestURL().toString();
        String nextUrl = hotels.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String prevUrl = hotels.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<HotelResponseDTO>(
                hotels.getContent(),
                hotels.getNumber() + 1,
                hotels.getTotalPages(),
                hotels.getTotalElements(),
                hotels.hasNext(),
                hotels.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


    // ***************************** ((Specifications)) *********************** //
    //    Big Search
    @GetMapping("/search")
    public ResponseEntity<GlobalResponse<PaginatedResponse<HotelResponseDTO>>> searchHotels(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "rating") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction,
            HttpServletRequest req
    ) {
        Page<HotelResponseDTO> hotels = hotelService.searchHotels(
                name, city, country, phoneNumber, isActive,
                page - 1, size, sortBy, direction
        );

        String baseUrl = req.getRequestURL().toString();

        // Build query params for pagination URLs
        StringBuilder queryParams = new StringBuilder();
        if (name != null) queryParams.append("&name=").append(name);
        if (city != null) queryParams.append("&city=").append(city);
        if (country != null) queryParams.append("&country=").append(country);
        if (phoneNumber != null) queryParams.append("&phoneNumber=").append(phoneNumber);
        if (isActive != null) queryParams.append("&isActive=").append(isActive);
        queryParams.append("&size=").append(size);
        queryParams.append("&sortBy=").append(sortBy);
        queryParams.append("&direction=").append(direction);

        String nextUrl = hotels.hasNext()
                ? String.format("%s?page=%d%s", baseUrl, page + 1, queryParams)
                : null;
        String prevUrl = hotels.hasPrevious()
                ? String.format("%s?page=%d%s", baseUrl, page - 1, queryParams)
                : null;

        var paginatedResponse = new PaginatedResponse<>(
                hotels.getContent(),
                hotels.getNumber() + 1,
                hotels.getTotalPages(),
                hotels.getTotalElements(),
                hotels.hasNext(),
                hotels.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


}
