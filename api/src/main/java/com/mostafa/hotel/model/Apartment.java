package com.mostafa.hotel.model;

import com.mostafa.hotel.base.BaseEntity;
import com.mostafa.hotel.enums.ApartmentType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;


@Entity
@Table(name = "apartments")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Apartment extends BaseEntity<UUID> {
    @Column(name = "apartment_number", nullable = false)
    private String apartmentNumber;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "price_per_night", nullable = false)
    private BigDecimal pricePerNight;

    @Column(name = "total_capacity", nullable = false)
    private Integer totalCapacity;

    @Column(name = "number_of_bedrooms", nullable = false)
    private Integer numberOfBedrooms;

    @Column(name = "number_of_bathrooms", nullable = false)
    private Integer numberOfBathrooms;

    @Column(name = "floor_number")
    private Integer floorNumber;

    @Column(name = "area_sqm")
    private BigDecimal areaSqm;

    @Column(name = "is_available")
    private Boolean isAvailable = true;


    // Whether individual rooms in this apartment can be booked separately 😜
    @Column(name = "rooms_bookable_separately")
    private Boolean roomsBookableSeparately = false;


    // Apartment -> ((True, False)) 🥰
    @Column(name = "has_kitchen")
    private Boolean hasKitchen = true;
    @Column(name = "has_living_room")
    private Boolean hasLivingRoom = true;
    @Column(name = "has_dining_area")
    private Boolean hasDiningArea = false;
    @Column(name = "has_balcony")
    private Boolean hasBalcony = false;
    @Column(name = "has_wifi")
    private Boolean hasWifi = true;
    @Column(name = "has_air_conditioning")
    private Boolean hasAirConditioning = true;
    @Column(name = "has_parking")
    private Boolean hasParking = false;
    @Column(name = "has_laundry")
    private Boolean hasLaundry = false;


    @Enumerated(EnumType.STRING)
    @Column(name = "apartment_type", nullable = false)
    private ApartmentType apartmentType;


    //    RelationShips
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Room> rooms;

    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> apartmentBookings;
}
