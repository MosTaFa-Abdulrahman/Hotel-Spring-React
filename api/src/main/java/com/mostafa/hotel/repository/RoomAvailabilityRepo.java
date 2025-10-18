package com.mostafa.hotel.repository;

import com.mostafa.hotel.model.RoomAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.UUID;


@Repository
public interface RoomAvailabilityRepo extends JpaRepository<RoomAvailability, UUID> {
    //     Find availability record by room ID and date
    @Query("SELECT ra FROM RoomAvailability ra WHERE ra.room.id = :roomId AND ra.date = :date")
    RoomAvailability findByRoomIdAndDate(
            @Param("roomId") UUID roomId,
            @Param("date") LocalDate date
    );


}
