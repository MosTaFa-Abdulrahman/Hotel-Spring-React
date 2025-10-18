package com.mostafa.hotel.model;

import com.mostafa.hotel.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@Entity
@Table(name = "room_availability",
        uniqueConstraints = @UniqueConstraint(columnNames = {"room_id", "date"}))
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomAvailability extends BaseEntity<UUID> {
    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;


    //    RelationShips
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
}
