package com.mostafa.hotel.enums;

public enum PaymentStatus {
    PENDING,    // Initial payment status
    REFUNDED,   // Partial payment - amount less than expected
    PAID        // Full payment completed (exact or overpayment)
}