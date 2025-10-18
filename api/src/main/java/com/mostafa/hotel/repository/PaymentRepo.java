package com.mostafa.hotel.repository;

import com.mostafa.hotel.model.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface PaymentRepo extends JpaRepository<Payment, UUID> {
    // Find all payments for ((Current-User))
    Page<Payment> findByUserId(UUID userId, Pageable pageable);
}
