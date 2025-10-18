package com.mostafa.hotel.controller;


import com.mostafa.hotel.dto.PaginatedResponse;
import com.mostafa.hotel.dto.room.CreateRoomDTO;
import com.mostafa.hotel.dto.room.RoomResponseDTO;
import com.mostafa.hotel.dto.room.UpdateRoomDTO;
import com.mostafa.hotel.enums.RoomType;
import com.mostafa.hotel.global.GlobalResponse;
import com.mostafa.hotel.service.RoomService;
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
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;


    //    Create
    @PostMapping
    public ResponseEntity<GlobalResponse<RoomResponseDTO>> createRoom(
            @Valid @RequestBody CreateRoomDTO dto) {
        RoomResponseDTO createdRoom = roomService.createRoom(dto);
        GlobalResponse<RoomResponseDTO> res = new GlobalResponse<>(createdRoom);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    //    Update By (roomId)
    @PutMapping("/{roomId}")
    public ResponseEntity<GlobalResponse<RoomResponseDTO>> updateRoom(
            @PathVariable UUID roomId,
            @Valid @RequestBody UpdateRoomDTO dto) {
        RoomResponseDTO updatedRoom = roomService.updateRoom(roomId, dto);
        GlobalResponse<RoomResponseDTO> res = new GlobalResponse<>(updatedRoom);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Delete By (roomId)
    @DeleteMapping("/{roomId}")
    public ResponseEntity<GlobalResponse<String>> deleteRoom(@PathVariable UUID roomId) {
        String deletedRoom = roomService.deleteRoom(roomId);
        GlobalResponse<String> res = new GlobalResponse<>(deletedRoom);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get Single By (roomId)
    @GetMapping("/{roomId}")
    public ResponseEntity<GlobalResponse<RoomResponseDTO>> getRoom(
            @PathVariable UUID roomId) {
        RoomResponseDTO apartment = roomService.getRoom(roomId);
        GlobalResponse<RoomResponseDTO> res = new GlobalResponse<>(apartment);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get All
    @GetMapping
    public ResponseEntity<GlobalResponse<PaginatedResponse<RoomResponseDTO>>> getAllRooms(
            @RequestParam(required = false) String roomNumber,
            @RequestParam(required = false) RoomType roomType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Integer maxCapacity,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) Boolean hasWifi,
            @RequestParam(required = false) Boolean hasAirConditioning,
            @RequestParam(required = false) Boolean hasTv,
            @RequestParam(required = false) Boolean hasMiniBar,
            @RequestParam(required = false) Boolean hasBalcony,
            @RequestParam(required = false) Boolean hasPrivateBathroom,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "pricePerNight") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction,
            HttpServletRequest req
    ) {
        Page<RoomResponseDTO> rooms = roomService.getAll(
                roomNumber,
                roomType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                isAvailable,
                hasWifi,
                hasAirConditioning,
                hasTv,
                hasMiniBar,
                hasBalcony,
                hasPrivateBathroom,
                page - 1,
                size,
                sortBy,
                direction
        );

        String baseUrl = req.getRequestURL().toString();

        // Build query params for pagination URLs
        StringBuilder queryParams = new StringBuilder();
        if (roomNumber != null) queryParams.append("&roomNumber=").append(roomNumber);
        if (roomType != null) queryParams.append("&roomType=").append(roomType);
        if (minPrice != null) queryParams.append("&minPrice=").append(minPrice);
        if (maxPrice != null) queryParams.append("&maxPrice=").append(maxPrice);
        if (minCapacity != null) queryParams.append("&minCapacity=").append(minCapacity);
        if (maxCapacity != null) queryParams.append("&maxCapacity=").append(maxCapacity);
        if (isAvailable != null) queryParams.append("&isAvailable=").append(isAvailable);
        if (hasWifi != null) queryParams.append("&hasWifi=").append(hasWifi);
        if (hasAirConditioning != null) queryParams.append("&hasAirConditioning=").append(hasAirConditioning);
        if (hasTv != null) queryParams.append("&hasTv=").append(hasTv);
        if (hasMiniBar != null) queryParams.append("&hasMiniBar=").append(hasMiniBar);
        if (hasBalcony != null) queryParams.append("&hasBalcony=").append(hasBalcony);
        if (hasPrivateBathroom != null) queryParams.append("&hasPrivateBathroom=").append(hasPrivateBathroom);
        queryParams.append("&size=").append(size);
        queryParams.append("&sortBy=").append(sortBy);
        queryParams.append("&direction=").append(direction);

        String nextUrl = rooms.hasNext()
                ? String.format("%s?page=%d%s", baseUrl, page + 1, queryParams)
                : null;
        String prevUrl = rooms.hasPrevious()
                ? String.format("%s?page=%d%s", baseUrl, page - 1, queryParams)
                : null;

        var paginatedResponse = new PaginatedResponse<>(
                rooms.getContent(),
                rooms.getNumber() + 1,
                rooms.getTotalPages(),
                rooms.getTotalElements(),
                rooms.hasNext(),
                rooms.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


    // ***************************** ((Specifications)) *********************** //
    /*
     * Get All Rooms for ((Specific-Apartment))
     * With Advanced Search 🤞
     */
    @GetMapping("/apartment/{apartmentId}")
    public ResponseEntity<GlobalResponse<PaginatedResponse<RoomResponseDTO>>> getAllForApartment(
            @PathVariable UUID apartmentId,
            @RequestParam(required = false) String roomNumber,
            @RequestParam(required = false) RoomType roomType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Integer maxCapacity,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) Boolean hasWifi,
            @RequestParam(required = false) Boolean hasAirConditioning,
            @RequestParam(required = false) Boolean hasTv,
            @RequestParam(required = false) Boolean hasMiniBar,
            @RequestParam(required = false) Boolean hasBalcony,
            @RequestParam(required = false) Boolean hasPrivateBathroom,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "pricePerNight") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction,
            HttpServletRequest req
    ) {
        Page<RoomResponseDTO> rooms = roomService.getAllForApartment(
                apartmentId,
                roomNumber,
                roomType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                isAvailable,
                hasWifi,
                hasAirConditioning,
                hasTv,
                hasMiniBar,
                hasBalcony,
                hasPrivateBathroom,
                page - 1,
                size,
                sortBy,
                direction
        );

        String baseUrl = req.getRequestURL().toString();

        // Build query params for pagination URLs
        StringBuilder queryParams = new StringBuilder();
        if (roomNumber != null) queryParams.append("&roomNumber=").append(roomNumber);
        if (roomType != null) queryParams.append("&roomType=").append(roomType);
        if (minPrice != null) queryParams.append("&minPrice=").append(minPrice);
        if (maxPrice != null) queryParams.append("&maxPrice=").append(maxPrice);
        if (minCapacity != null) queryParams.append("&minCapacity=").append(minCapacity);
        if (maxCapacity != null) queryParams.append("&maxCapacity=").append(maxCapacity);
        if (isAvailable != null) queryParams.append("&isAvailable=").append(isAvailable);
        if (hasWifi != null) queryParams.append("&hasWifi=").append(hasWifi);
        if (hasAirConditioning != null) queryParams.append("&hasAirConditioning=").append(hasAirConditioning);
        if (hasTv != null) queryParams.append("&hasTv=").append(hasTv);
        if (hasMiniBar != null) queryParams.append("&hasMiniBar=").append(hasMiniBar);
        if (hasBalcony != null) queryParams.append("&hasBalcony=").append(hasBalcony);
        if (hasPrivateBathroom != null) queryParams.append("&hasPrivateBathroom=").append(hasPrivateBathroom);
        queryParams.append("&size=").append(size);
        queryParams.append("&sortBy=").append(sortBy);
        queryParams.append("&direction=").append(direction);

        String nextUrl = rooms.hasNext()
                ? String.format("%s?page=%d%s", baseUrl, page + 1, queryParams)
                : null;
        String prevUrl = rooms.hasPrevious()
                ? String.format("%s?page=%d%s", baseUrl, page - 1, queryParams)
                : null;

        var paginatedResponse = new PaginatedResponse<>(
                rooms.getContent(),
                rooms.getNumber() + 1,
                rooms.getTotalPages(),
                rooms.getTotalElements(),
                rooms.hasNext(),
                rooms.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


    /*
     * Get All Standalone Rooms for ((Specific-Hotel)) - Not belonging to any apartment
     * With Advanced Search 🤞
     */
    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<GlobalResponse<PaginatedResponse<RoomResponseDTO>>> getAllStandaloneRoomsForHotel(
            @PathVariable UUID hotelId,
            @RequestParam(required = false) String roomNumber,
            @RequestParam(required = false) RoomType roomType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Integer maxCapacity,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) Boolean hasWifi,
            @RequestParam(required = false) Boolean hasAirConditioning,
            @RequestParam(required = false) Boolean hasTv,
            @RequestParam(required = false) Boolean hasMiniBar,
            @RequestParam(required = false) Boolean hasBalcony,
            @RequestParam(required = false) Boolean hasPrivateBathroom,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "pricePerNight") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction,
            HttpServletRequest req
    ) {
        Page<RoomResponseDTO> rooms = roomService.getAllStandaloneRoomsWithSearchForHotel(
                hotelId,
                roomNumber,
                roomType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                isAvailable,
                hasWifi,
                hasAirConditioning,
                hasTv,
                hasMiniBar,
                hasBalcony,
                hasPrivateBathroom,
                page - 1,
                size,
                sortBy,
                direction
        );

        String baseUrl = req.getRequestURL().toString();

        // Build query params for pagination URLs
        StringBuilder queryParams = new StringBuilder();
        if (roomNumber != null) queryParams.append("&roomNumber=").append(roomNumber);
        if (roomType != null) queryParams.append("&roomType=").append(roomType);
        if (minPrice != null) queryParams.append("&minPrice=").append(minPrice);
        if (maxPrice != null) queryParams.append("&maxPrice=").append(maxPrice);
        if (minCapacity != null) queryParams.append("&minCapacity=").append(minCapacity);
        if (maxCapacity != null) queryParams.append("&maxCapacity=").append(maxCapacity);
        if (isAvailable != null) queryParams.append("&isAvailable=").append(isAvailable);
        if (hasWifi != null) queryParams.append("&hasWifi=").append(hasWifi);
        if (hasAirConditioning != null) queryParams.append("&hasAirConditioning=").append(hasAirConditioning);
        if (hasTv != null) queryParams.append("&hasTv=").append(hasTv);
        if (hasMiniBar != null) queryParams.append("&hasMiniBar=").append(hasMiniBar);
        if (hasBalcony != null) queryParams.append("&hasBalcony=").append(hasBalcony);
        if (hasPrivateBathroom != null) queryParams.append("&hasPrivateBathroom=").append(hasPrivateBathroom);
        queryParams.append("&size=").append(size);
        queryParams.append("&sortBy=").append(sortBy);
        queryParams.append("&direction=").append(direction);

        String nextUrl = rooms.hasNext()
                ? String.format("%s?page=%d%s", baseUrl, page + 1, queryParams)
                : null;
        String prevUrl = rooms.hasPrevious()
                ? String.format("%s?page=%d%s", baseUrl, page - 1, queryParams)
                : null;

        var paginatedResponse = new PaginatedResponse<>(
                rooms.getContent(),
                rooms.getNumber() + 1,
                rooms.getTotalPages(),
                rooms.getTotalElements(),
                rooms.hasNext(),
                rooms.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


}
