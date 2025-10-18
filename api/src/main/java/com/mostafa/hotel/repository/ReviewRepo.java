package com.mostafa.hotel.repository;

import com.mostafa.hotel.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ReviewRepo extends JpaRepository<Review, UUID> {
}
