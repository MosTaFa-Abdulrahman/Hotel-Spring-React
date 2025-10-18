package com.mostafa.hotel.repository;

import com.mostafa.hotel.enums.RoomType;
import com.mostafa.hotel.model.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.UUID;


@Repository
public interface RoomRepo extends JpaRepository<Room, UUID> {
    //     🏨 Get All Rooms ((With Advanced Search 🤞))
    @Query("SELECT r FROM Room r WHERE " +
            "(:roomNumber IS NULL OR :roomNumber = '' OR LOWER(r.roomNumber) LIKE LOWER(CONCAT('%', :roomNumber, '%'))) AND " +
            "(:roomType IS NULL OR r.roomType = :roomType) AND " +
            "(:minPrice IS NULL OR r.pricePerNight >= :minPrice) AND " +
            "(:maxPrice IS NULL OR r.pricePerNight <= :maxPrice) AND " +
            "(:minCapacity IS NULL OR r.capacity >= :minCapacity) AND " +
            "(:maxCapacity IS NULL OR r.capacity <= :maxCapacity) AND " +
            "(:isAvailable IS NULL OR r.isAvailable = :isAvailable) AND " +
            "(:hasWifi IS NULL OR r.hasWifi = :hasWifi) AND " +
            "(:hasAirConditioning IS NULL OR r.hasAirConditioning = :hasAirConditioning) AND " +
            "(:hasTv IS NULL OR r.hasTv = :hasTv) AND " +
            "(:hasMiniBar IS NULL OR r.hasMiniBar = :hasMiniBar) AND " +
            "(:hasBalcony IS NULL OR r.hasBalcony = :hasBalcony) AND " +
            "(:hasPrivateBathroom IS NULL OR r.hasPrivateBathroom = :hasPrivateBathroom)")
    Page<Room> advancedSearchAllRooms(
            @Param("roomNumber") String roomNumber,
            @Param("roomType") RoomType roomType,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("isAvailable") Boolean isAvailable,
            @Param("hasWifi") Boolean hasWifi,
            @Param("hasAirConditioning") Boolean hasAirConditioning,
            @Param("hasTv") Boolean hasTv,
            @Param("hasMiniBar") Boolean hasMiniBar,
            @Param("hasBalcony") Boolean hasBalcony,
            @Param("hasPrivateBathroom") Boolean hasPrivateBathroom,
            Pageable pageable
    );


    /*
     * Get All Rooms for ((Specific-Apartment))
     * With Advanced Search 🤞
     */
    @Query("SELECT r FROM Room r WHERE " +
            "(:apartmentId IS NULL OR r.apartment.id = :apartmentId) AND " +
            "(:roomNumber IS NULL OR :roomNumber = '' OR LOWER(r.roomNumber) LIKE LOWER(CONCAT('%', :roomNumber, '%'))) AND " +
            "(:roomType IS NULL OR r.roomType = :roomType) AND " +
            "(:minPrice IS NULL OR r.pricePerNight >= :minPrice) AND " +
            "(:maxPrice IS NULL OR r.pricePerNight <= :maxPrice) AND " +
            "(:minCapacity IS NULL OR r.capacity >= :minCapacity) AND " +
            "(:maxCapacity IS NULL OR r.capacity <= :maxCapacity) AND " +
            "(:isAvailable IS NULL OR r.isAvailable = :isAvailable) AND " +
            "(:hasWifi IS NULL OR r.hasWifi = :hasWifi) AND " +
            "(:hasAirConditioning IS NULL OR r.hasAirConditioning = :hasAirConditioning) AND " +
            "(:hasTv IS NULL OR r.hasTv = :hasTv) AND " +
            "(:hasMiniBar IS NULL OR r.hasMiniBar = :hasMiniBar) AND " +
            "(:hasBalcony IS NULL OR r.hasBalcony = :hasBalcony) AND " +
            "(:hasPrivateBathroom IS NULL OR r.hasPrivateBathroom = :hasPrivateBathroom)")
    Page<Room> searchRoomsForApartment(
            @Param("apartmentId") UUID apartmentId,
            @Param("roomNumber") String roomNumber,
            @Param("roomType") RoomType roomType,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("isAvailable") Boolean isAvailable,
            @Param("hasWifi") Boolean hasWifi,
            @Param("hasAirConditioning") Boolean hasAirConditioning,
            @Param("hasTv") Boolean hasTv,
            @Param("hasMiniBar") Boolean hasMiniBar,
            @Param("hasBalcony") Boolean hasBalcony,
            @Param("hasPrivateBathroom") Boolean hasPrivateBathroom,
            Pageable pageable
    );


    /*
     * Get All Standalone Rooms for ((Specific-Hotel)) - Not belonging to any apartment
     * With Advanced Search 🤞
     */
    @Query("SELECT r FROM Room r WHERE " +
            "r.apartment IS NULL AND " +
            "(:hotelId IS NULL OR r.hotel.id = :hotelId) AND " +
            "(:roomNumber IS NULL OR :roomNumber = '' OR LOWER(r.roomNumber) LIKE LOWER(CONCAT('%', :roomNumber, '%'))) AND " +
            "(:roomType IS NULL OR r.roomType = :roomType) AND " +
            "(:minPrice IS NULL OR r.pricePerNight >= :minPrice) AND " +
            "(:maxPrice IS NULL OR r.pricePerNight <= :maxPrice) AND " +
            "(:minCapacity IS NULL OR r.capacity >= :minCapacity) AND " +
            "(:maxCapacity IS NULL OR r.capacity <= :maxCapacity) AND " +
            "(:isAvailable IS NULL OR r.isAvailable = :isAvailable) AND " +
            "(:hasWifi IS NULL OR r.hasWifi = :hasWifi) AND " +
            "(:hasAirConditioning IS NULL OR r.hasAirConditioning = :hasAirConditioning) AND " +
            "(:hasTv IS NULL OR r.hasTv = :hasTv) AND " +
            "(:hasMiniBar IS NULL OR r.hasMiniBar = :hasMiniBar) AND " +
            "(:hasBalcony IS NULL OR r.hasBalcony = :hasBalcony) AND " +
            "(:hasPrivateBathroom IS NULL OR r.hasPrivateBathroom = :hasPrivateBathroom)")
    Page<Room> searchStandaloneRooms(
            @Param("hotelId") UUID hotelId,
            @Param("roomNumber") String roomNumber,
            @Param("roomType") RoomType roomType,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("isAvailable") Boolean isAvailable,
            @Param("hasWifi") Boolean hasWifi,
            @Param("hasAirConditioning") Boolean hasAirConditioning,
            @Param("hasTv") Boolean hasTv,
            @Param("hasMiniBar") Boolean hasMiniBar,
            @Param("hasBalcony") Boolean hasBalcony,
            @Param("hasPrivateBathroom") Boolean hasPrivateBathroom,
            Pageable pageable
    );


}
