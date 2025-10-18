package com.mostafa.hotel.repository;

import com.mostafa.hotel.enums.ApartmentType;
import com.mostafa.hotel.model.Apartment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.UUID;


@Repository
public interface ApartmentRepo extends JpaRepository<Apartment, UUID> {
    // 🏠 Get All Apartments ((With Advanced Search 🤞))
    @Query("SELECT a FROM Apartment a WHERE " +
            "(:apartmentNumber IS NULL OR :apartmentNumber = '' OR LOWER(a.apartmentNumber) LIKE LOWER(CONCAT('%', :apartmentNumber, '%'))) AND " +
            "(:name IS NULL OR :name = '' OR LOWER(a.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:apartmentType IS NULL OR a.apartmentType = :apartmentType) AND " +
            "(:minPrice IS NULL OR a.pricePerNight >= :minPrice) AND " +
            "(:maxPrice IS NULL OR a.pricePerNight <= :maxPrice) AND " +
            "(:minCapacity IS NULL OR a.totalCapacity >= :minCapacity) AND " +
            "(:maxCapacity IS NULL OR a.totalCapacity <= :maxCapacity) AND " +
            "(:minBedrooms IS NULL OR a.numberOfBedrooms >= :minBedrooms) AND " +
            "(:maxBedrooms IS NULL OR a.numberOfBedrooms <= :maxBedrooms) AND " +
            "(:minBathrooms IS NULL OR a.numberOfBathrooms >= :minBathrooms) AND " +
            "(:maxBathrooms IS NULL OR a.numberOfBathrooms <= :maxBathrooms) AND " +
            "(:floorNumber IS NULL OR a.floorNumber = :floorNumber) AND " +
            "(:minArea IS NULL OR a.areaSqm >= :minArea) AND " +
            "(:maxArea IS NULL OR a.areaSqm <= :maxArea) AND " +
            "(:isAvailable IS NULL OR a.isAvailable = :isAvailable) AND " +
            "(:roomsBookableSeparately IS NULL OR a.roomsBookableSeparately = :roomsBookableSeparately) AND " +
            "(:hasKitchen IS NULL OR a.hasKitchen = :hasKitchen) AND " +
            "(:hasLivingRoom IS NULL OR a.hasLivingRoom = :hasLivingRoom) AND " +
            "(:hasDiningArea IS NULL OR a.hasDiningArea = :hasDiningArea) AND " +
            "(:hasBalcony IS NULL OR a.hasBalcony = :hasBalcony) AND " +
            "(:hasWifi IS NULL OR a.hasWifi = :hasWifi) AND " +
            "(:hasAirConditioning IS NULL OR a.hasAirConditioning = :hasAirConditioning) AND " +
            "(:hasParking IS NULL OR a.hasParking = :hasParking) AND " +
            "(:hasLaundry IS NULL OR a.hasLaundry = :hasLaundry)")
    Page<Apartment> advancedSearchAll(
            @Param("apartmentNumber") String apartmentNumber,
            @Param("name") String name,
            @Param("apartmentType") ApartmentType apartmentType,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("minBedrooms") Integer minBedrooms,
            @Param("maxBedrooms") Integer maxBedrooms,
            @Param("minBathrooms") Integer minBathrooms,
            @Param("maxBathrooms") Integer maxBathrooms,
            @Param("floorNumber") Integer floorNumber,
            @Param("minArea") BigDecimal minArea,
            @Param("maxArea") BigDecimal maxArea,
            @Param("isAvailable") Boolean isAvailable,
            @Param("roomsBookableSeparately") Boolean roomsBookableSeparately,
            @Param("hasKitchen") Boolean hasKitchen,
            @Param("hasLivingRoom") Boolean hasLivingRoom,
            @Param("hasDiningArea") Boolean hasDiningArea,
            @Param("hasBalcony") Boolean hasBalcony,
            @Param("hasWifi") Boolean hasWifi,
            @Param("hasAirConditioning") Boolean hasAirConditioning,
            @Param("hasParking") Boolean hasParking,
            @Param("hasLaundry") Boolean hasLaundry,
            Pageable pageable
    );


    //    Get All Apartments for ((Specific-Hotel)) With ((Advanced-Search 🤞))
    @Query("SELECT a FROM Apartment a WHERE " +
            "(:hotelId IS NULL OR a.hotel.id = :hotelId) AND " +
            "(:apartmentNumber IS NULL OR :apartmentNumber = '' OR LOWER(a.apartmentNumber) LIKE LOWER(CONCAT('%', :apartmentNumber, '%'))) AND " +
            "(:name IS NULL OR :name = '' OR LOWER(a.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:apartmentType IS NULL OR a.apartmentType = :apartmentType) AND " +
            "(:minPrice IS NULL OR a.pricePerNight >= :minPrice) AND " +
            "(:maxPrice IS NULL OR a.pricePerNight <= :maxPrice) AND " +
            "(:minCapacity IS NULL OR a.totalCapacity >= :minCapacity) AND " +
            "(:maxCapacity IS NULL OR a.totalCapacity <= :maxCapacity) AND " +
            "(:minBedrooms IS NULL OR a.numberOfBedrooms >= :minBedrooms) AND " +
            "(:maxBedrooms IS NULL OR a.numberOfBedrooms <= :maxBedrooms) AND " +
            "(:minBathrooms IS NULL OR a.numberOfBathrooms >= :minBathrooms) AND " +
            "(:maxBathrooms IS NULL OR a.numberOfBathrooms <= :maxBathrooms) AND " +
            "(:floorNumber IS NULL OR a.floorNumber = :floorNumber) AND " +
            "(:minArea IS NULL OR a.areaSqm >= :minArea) AND " +
            "(:maxArea IS NULL OR a.areaSqm <= :maxArea) AND " +
            "(:isAvailable IS NULL OR a.isAvailable = :isAvailable) AND " +
            "(:roomsBookableSeparately IS NULL OR a.roomsBookableSeparately = :roomsBookableSeparately) AND " +
            "(:hasKitchen IS NULL OR a.hasKitchen = :hasKitchen) AND " +
            "(:hasLivingRoom IS NULL OR a.hasLivingRoom = :hasLivingRoom) AND " +
            "(:hasDiningArea IS NULL OR a.hasDiningArea = :hasDiningArea) AND " +
            "(:hasBalcony IS NULL OR a.hasBalcony = :hasBalcony) AND " +
            "(:hasWifi IS NULL OR a.hasWifi = :hasWifi) AND " +
            "(:hasAirConditioning IS NULL OR a.hasAirConditioning = :hasAirConditioning) AND " +
            "(:hasParking IS NULL OR a.hasParking = :hasParking) AND " +
            "(:hasLaundry IS NULL OR a.hasLaundry = :hasLaundry)")
    Page<Apartment> advancedSearch(
            @Param("hotelId") UUID hotelId,
            @Param("apartmentNumber") String apartmentNumber,
            @Param("name") String name,
            @Param("apartmentType") ApartmentType apartmentType,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("minBedrooms") Integer minBedrooms,
            @Param("maxBedrooms") Integer maxBedrooms,
            @Param("minBathrooms") Integer minBathrooms,
            @Param("maxBathrooms") Integer maxBathrooms,
            @Param("floorNumber") Integer floorNumber,
            @Param("minArea") BigDecimal minArea,
            @Param("maxArea") BigDecimal maxArea,
            @Param("isAvailable") Boolean isAvailable,
            @Param("roomsBookableSeparately") Boolean roomsBookableSeparately,
            @Param("hasKitchen") Boolean hasKitchen,
            @Param("hasLivingRoom") Boolean hasLivingRoom,
            @Param("hasDiningArea") Boolean hasDiningArea,
            @Param("hasBalcony") Boolean hasBalcony,
            @Param("hasWifi") Boolean hasWifi,
            @Param("hasAirConditioning") Boolean hasAirConditioning,
            @Param("hasParking") Boolean hasParking,
            @Param("hasLaundry") Boolean hasLaundry,
            Pageable pageable
    );


}
