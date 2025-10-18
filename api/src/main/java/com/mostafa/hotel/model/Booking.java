package com.mostafa.hotel.model;

import com.mostafa.hotel.base.BaseEntity;
import com.mostafa.hotel.enums.BookingStatus;
import com.mostafa.hotel.enums.BookingType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@Entity
@Table(name = "bookings")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking extends BaseEntity<UUID> {
    @Column(name = "check_in_date", nullable = false)
    private LocalDate checkInDate;

    @Column(name = "check_out_date", nullable = false)
    private LocalDate checkOutDate;

    @Column(name = "number_of_guests", nullable = false)
    private Integer numberOfGuests;


    @Enumerated(EnumType.STRING)
    @Column(name = "booking_type", nullable = false)
    private BookingType bookingType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;


    //    RelationShips
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    // For apartment bookings (entire apartment)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;

    // For individual room bookings (standalone or apartment room)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    // Payment relationship (One booking -> One payment)
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;


    // Helper methods
    public boolean isApartmentBooking() {
        return bookingType == BookingType.APARTMENT && apartment != null;
    }

    public boolean isRoomBooking() {
        return bookingType == BookingType.ROOM && room != null;
    }


}
