package com.mostafa.hotel.repository;

import com.mostafa.hotel.model.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface HotelRepo extends JpaRepository<Hotel, UUID> {
    //    Found or Not
    boolean existsByEmail(String email);

    //     Advanced search with optional filters (Paginated)
    @Query("SELECT h FROM Hotel h WHERE " +
            "(:name IS NULL OR :name = '' OR LOWER(h.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:city IS NULL OR :city = '' OR LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
            "(:country IS NULL OR :country = '' OR LOWER(h.country) LIKE LOWER(CONCAT('%', :country, '%'))) AND " +
            "(:phoneNumber IS NULL OR :phoneNumber = '' OR h.phoneNumber LIKE CONCAT('%', :phoneNumber, '%')) AND " +
            "(:isActive IS NULL OR h.isActive = :isActive)")
    Page<Hotel> advancedSearch(
            @Param("name") String name,
            @Param("city") String city,
            @Param("country") String country,
            @Param("phoneNumber") String phoneNumber,
            @Param("isActive") Boolean isActive,
            Pageable pageable
    );

}
