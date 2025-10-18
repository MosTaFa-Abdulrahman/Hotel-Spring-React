package com.mostafa.hotel.repository;

import com.mostafa.hotel.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Repository
public interface BookingRepo extends JpaRepository<Booking, UUID> {
    //     Find all bookings by user ID
    Page<Booking> findByUserId(@Param("userId") UUID userId, Pageable pageable);

    // Find all bookings for a specific apartment
    List<Booking> findByApartmentId(@Param("apartmentId") UUID apartmentId);

    // Find all bookings for a specific room
    List<Booking> findByRoomId(@Param("roomId") UUID roomId);


    //   Find all bookings for a specific hotel
    Page<Booking> findByHotelId(@Param("hotelId") UUID hotelId, Pageable pageable);


    //    Check if user has any booking that overlaps with the given date range
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " +
            "WHERE b.user.id = :userId " +
            "AND b.status != 'CANCELLED' " +
            "AND NOT (b.checkOutDate <= :checkIn OR b.checkInDate >= :checkOut)")
    boolean existsByUserIdAndDateRange(
            @Param("userId") UUID userId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );

    //     Check if apartment has any booking that overlaps with the given date range
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " +
            "WHERE b.apartment.id = :apartmentId " +
            "AND b.status != 'CANCELLED' " +
            "AND NOT (b.checkOutDate <= :checkIn OR b.checkInDate >= :checkOut)")
    boolean existsByApartmentIdAndDateRange(
            @Param("apartmentId") UUID apartmentId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );

    //     Check if room has any booking that overlaps with the given date range
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " +
            "WHERE b.room.id = :roomId " +
            "AND b.status != 'CANCELLED' " +
            "AND NOT (b.checkOutDate <= :checkIn OR b.checkInDate >= :checkOut)")
    boolean existsByRoomIdAndDateRange(
            @Param("roomId") UUID roomId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );


}
