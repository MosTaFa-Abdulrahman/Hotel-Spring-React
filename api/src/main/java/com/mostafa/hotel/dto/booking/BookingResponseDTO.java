package com.mostafa.hotel.dto.booking;

import com.mostafa.hotel.enums.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;


public record BookingResponseDTO(
        UUID id,
        LocalDate checkInDate,
        LocalDate checkOutDate,
        Integer numberOfGuests,
        BookingType bookingType,
        BookingStatus status,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate,

        // User Info
        UUID userId,
        String userFirstName,
        String userLastName,
        String userEmail,
        String userImg,

        // Hotel Info
        UUID hotelId,
        String hotelName,
        String hotelCity,
        String hotelCountry,
        String hotelImgUrl,

        // Apartment Info (if applicable)
        UUID apartmentId,
        String apartmentNumber,
        String apartmentName,
        BigDecimal apartmentPricePerNight,
        Integer apartmentTotalCapacity,
        String apartmentImgUrl,
        ApartmentType apartmentType,

        // Room Info (if applicable)
        UUID roomId,
        String roomNumber,
        BigDecimal roomPricePerNight,
        Integer roomCapacity,
        String roomImgUrl,
        RoomType roomType,

        // Booking type indicators
        Boolean isApartmentBooking,
        Boolean isRoomBooking,

        // Payment Info
        UUID paymentId,
        PaymentStatus paymentStatus,
        BigDecimal paidAmount,
        BigDecimal expectedAmount,
        BigDecimal shortageAmount,
        Boolean hasShortage
) {
}