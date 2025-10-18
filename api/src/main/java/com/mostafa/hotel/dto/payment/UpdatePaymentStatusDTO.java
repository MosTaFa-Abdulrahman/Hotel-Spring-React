package com.mostafa.hotel.dto.payment;

import java.util.UUID;

public record UpdatePaymentStatusDTO(
        UUID paymentId,
        String status, // COMPLETED, FAILED, REFUNDED
        String notes
) {
}
