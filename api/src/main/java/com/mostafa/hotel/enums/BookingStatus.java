package com.mostafa.hotel.enums;

public enum BookingStatus {
    PENDING,           // Initial status when booking is created
    CANCELLED,         // When booking is cancelled (only if payment is PENDING or REFUNDED)
    COMPLETED,         // When payment is PAID
    PARTIAL_PAYMENT,    // When payment status is REFUNDED (partial payment made)
    CONFIRMED         // Only ADMIN or MANAGER can set this
}