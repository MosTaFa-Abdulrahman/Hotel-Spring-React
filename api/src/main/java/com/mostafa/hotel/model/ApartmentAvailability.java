package com.mostafa.hotel.model;

import com.mostafa.hotel.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@Entity
@Table(name = "apartment_availability",
        uniqueConstraints = @UniqueConstraint(columnNames = {"apartment_id", "date"}))
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApartmentAvailability extends BaseEntity<UUID> {
    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;


    //    RelationShips
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", nullable = false)
    private Apartment apartment;
}
