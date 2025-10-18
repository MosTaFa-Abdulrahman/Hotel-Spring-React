package com.mostafa.hotel.repository;

import com.mostafa.hotel.model.ApartmentAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.UUID;


@Repository
public interface ApartmentAvailabilityRepo extends JpaRepository<ApartmentAvailability, UUID> {
    //     Find availability record by apartment ID and date
    @Query("SELECT aa FROM ApartmentAvailability aa WHERE aa.apartment.id = :apartmentId AND aa.date = :date")
    ApartmentAvailability findByApartmentIdAndDate(
            @Param("apartmentId") UUID apartmentId,
            @Param("date") LocalDate date
    );


}
