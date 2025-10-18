package com.mostafa.hotel.model;

import com.mostafa.hotel.base.BaseEntity;
import com.mostafa.hotel.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;


@Entity
@Table(name = "payments")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Payment extends BaseEntity<UUID> {
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "notes")
    private String notes;


    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PaymentStatus status;


    // Relationships
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}