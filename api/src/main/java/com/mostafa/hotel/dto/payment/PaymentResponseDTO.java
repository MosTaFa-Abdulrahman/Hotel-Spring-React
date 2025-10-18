package com.mostafa.hotel.dto.payment;

import com.mostafa.hotel.enums.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;


public record PaymentResponseDTO(
        UUID id,
        BigDecimal amount,
        PaymentStatus status,
        String notes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,

        // User Info
        UUID userId,
        String userFirstName,
        String userLastName,
        String userImg,

        // Booking Info
        UUID bookingId,
        BookingType bookingType,
        BookingStatus bookingStatus,
        LocalDate checkInDate,
        LocalDate checkOutDate,
        Integer numberOfGuests,

        // Apartment Info
        UUID apartmentId,
        String apartmentNumber,
        String apartmentName,
        String apartmentImgUrl,
        Integer apartmentCapacity,
        BigDecimal apartmentPricePerNight,
        ApartmentType apartmentType,

        // Room Info
        UUID roomId,
        String roomNumber,
        String roomImgUrl,
        Integer roomCapacity,
        BigDecimal roomPricePerNight,
        RoomType roomType,

        // Calculated Payment Fields
        BigDecimal expectedAmount,
        BigDecimal shortageAmount,
        BigDecimal extraAmount
) {
}