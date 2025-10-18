package com.mostafa.hotel.controller;

import com.mostafa.hotel.dto.PaginatedResponse;
import com.mostafa.hotel.dto.booking.BookingResponseDTO;
import com.mostafa.hotel.dto.booking.CreateBookingDTO;
import com.mostafa.hotel.global.GlobalResponse;
import com.mostafa.hotel.service.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;


    //    Create
    @PostMapping
    public ResponseEntity<GlobalResponse<BookingResponseDTO>> createBooking(
            @Valid @RequestBody CreateBookingDTO dto) {
        BookingResponseDTO createdBooking = bookingService.createBooking(dto);
        GlobalResponse<BookingResponseDTO> res = new GlobalResponse<>(createdBooking);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    //    Cancel
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<GlobalResponse<BookingResponseDTO>> cancelBooking(
            @PathVariable UUID bookingId) {
        BookingResponseDTO canceledBooking = bookingService.cancelBooking(bookingId);
        GlobalResponse<BookingResponseDTO> res = new GlobalResponse<>(canceledBooking);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get Single
    @GetMapping("/{bookingId}")
    public ResponseEntity<GlobalResponse<BookingResponseDTO>> getSingleBooking(
            @PathVariable UUID bookingId) {
        BookingResponseDTO getBooking = bookingService.getSingle(bookingId);
        GlobalResponse<BookingResponseDTO> res = new GlobalResponse<>(getBooking);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //    Get All for ((Current-User))
    @GetMapping
    public ResponseEntity<GlobalResponse<PaginatedResponse<BookingResponseDTO>>> getAllForCurrentUser(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest req
    ) {
        Page<BookingResponseDTO> bookings = bookingService.getCurrentUserBookings(page - 1, size);

        String baseUrl = req.getRequestURL().toString();
        String nextUrl = bookings.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String prevUrl = bookings.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<BookingResponseDTO>(
                bookings.getContent(),
                bookings.getNumber() + 1,
                bookings.getTotalPages(),
                bookings.getTotalElements(),
                bookings.hasNext(),
                bookings.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }

    //    Get All for ((Specific-User)) -> (((ADMIN OR MANAGER)))
    @GetMapping("/user/{userId}")
    public ResponseEntity<GlobalResponse<PaginatedResponse<BookingResponseDTO>>> getAllForUser(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest req
    ) {
        Page<BookingResponseDTO> bookings = bookingService.getUserBookings(userId, page - 1, size);

        String baseUrl = req.getRequestURL().toString();
        String nextUrl = bookings.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String prevUrl = bookings.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<BookingResponseDTO>(
                bookings.getContent(),
                bookings.getNumber() + 1,
                bookings.getTotalPages(),
                bookings.getTotalElements(),
                bookings.hasNext(),
                bookings.hasPrevious(),
                nextUrl,
                prevUrl
        );

        return new ResponseEntity<>(new GlobalResponse<>(paginatedResponse), HttpStatus.OK);
    }


    //    Get All For (((Specific-Room)))
    @GetMapping("/room/{roomId}")
    public ResponseEntity<GlobalResponse<List<BookingResponseDTO>>> getAllForRoom(
            @PathVariable UUID roomId
    ) {
        return new ResponseEntity<>(new GlobalResponse<>(bookingService.getRoomBookings(roomId)), HttpStatus.OK);
    }

    //    Get All For (((Specific-Apartment)))
    @GetMapping("/apartment/{apartmentId}")
    public ResponseEntity<GlobalResponse<List<BookingResponseDTO>>> getAllForApartment(
            @PathVariable UUID apartmentId
    ) {
        return new ResponseEntity<>(new GlobalResponse<>(bookingService.getApartmentBookings(apartmentId)), HttpStatus.OK);
    }


}
