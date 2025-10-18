package com.mostafa.hotel.model;

import com.mostafa.hotel.base.BaseEntity;
import com.mostafa.hotel.enums.RoomType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;


@Entity
@Table(name = "rooms")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Room extends BaseEntity<UUID> {
    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "price_per_night", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerNight;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    // Whether this room can be booked individually 😜
    @Column(name = "bookable_individually")
    private Boolean bookableIndividually = true;

    // Room -> ((True, False)) 🥰
    @Column(name = "has_wifi")
    private Boolean hasWifi = true;
    @Column(name = "has_air_conditioning")
    private Boolean hasAirConditioning = true;
    @Column(name = "has_tv")
    private Boolean hasTv = true;
    @Column(name = "has_mini_bar")
    private Boolean hasMiniBar = false;
    @Column(name = "has_balcony")
    private Boolean hasBalcony = false;
    @Column(name = "has_private_bathroom")
    private Boolean hasPrivateBathroom = true;


    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false)
    private RoomType roomType;


    //    RelationShips
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> roomBookings;


    // Helper method to check if room is part of an apartment
    public boolean isPartOfApartment() {
        return apartment != null;
    }

    // Helper method to check if room is standalone
    public boolean isStandaloneRoom() {
        return hotel != null && apartment == null;
    }


}
