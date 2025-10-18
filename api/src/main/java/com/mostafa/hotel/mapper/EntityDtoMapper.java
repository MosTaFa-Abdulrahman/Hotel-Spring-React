package com.mostafa.hotel.mapper;

import com.mostafa.hotel.dto.apartment.ApartmentResponseDTO;
import com.mostafa.hotel.dto.apartment.CreateApartmentDTO;
import com.mostafa.hotel.dto.booking.BookingResponseDTO;
import com.mostafa.hotel.dto.booking.CreateBookingDTO;
import com.mostafa.hotel.dto.hotel.CreateHotelDTO;
import com.mostafa.hotel.dto.hotel.HotelResponseDTO;
import com.mostafa.hotel.dto.payment.CreatePaymentDTO;
import com.mostafa.hotel.dto.payment.PaymentResponseDTO;
import com.mostafa.hotel.dto.review.CreateReviewDTO;
import com.mostafa.hotel.dto.review.ReviewResponseDTO;
import com.mostafa.hotel.dto.room.CreateRoomDTO;
import com.mostafa.hotel.dto.room.RoomResponseDTO;
import com.mostafa.hotel.dto.user.UserResponseDTO;
import com.mostafa.hotel.enums.BookingStatus;
import com.mostafa.hotel.enums.PaymentStatus;
import com.mostafa.hotel.model.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;


@Component
public class EntityDtoMapper {
    //    ****************************** ((User)) ************************* //
    public UserResponseDTO toUserResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getProfileImageUrl(),
                user.getRole()
        );
    }


    // ****************************** ((Hotel)) ************************* //
    public Hotel toHotelEntity(CreateHotelDTO createHotelDTO) {
        return Hotel.builder()
                .email(createHotelDTO.email())
                .name(createHotelDTO.name())
                .description(createHotelDTO.description())
                .address(createHotelDTO.address())
                .city(createHotelDTO.city())
                .country(createHotelDTO.country())
                .postalCode(createHotelDTO.postalCode())
                .phoneNumber(createHotelDTO.phoneNumber())
                .imageUrl(createHotelDTO.imageUrl())
                .isActive(true) // Default value
                .rating(null) // Will be calculated later
                .build();
    }

    public HotelResponseDTO toHotelResponseDTO(Hotel hotel) {
        return new HotelResponseDTO(
                hotel.getId(),
                hotel.getEmail(),
                hotel.getName(),
                hotel.getDescription(),
                hotel.getAddress(),
                hotel.getCity(),
                hotel.getCountry(),
                hotel.getPostalCode(),
                hotel.getPhoneNumber(),
                hotel.getImageUrl(),
                hotel.getRating(),
                hotel.getIsActive()
        );
    }

    // ****************************** ((Apartment)) ************************* //
    public Apartment toApartmentEntity(CreateApartmentDTO createApartmentDTO, Hotel hotel) {
        return Apartment.builder()
                .apartmentNumber(createApartmentDTO.apartmentNumber())
                .name(createApartmentDTO.name())
                .description(createApartmentDTO.description())
                .imageUrl(createApartmentDTO.imageUrl())
                .pricePerNight(createApartmentDTO.pricePerNight())
                .totalCapacity(createApartmentDTO.totalCapacity())
                .numberOfBedrooms(createApartmentDTO.numberOfBedrooms())
                .numberOfBathrooms(createApartmentDTO.numberOfBathrooms())
                .floorNumber(createApartmentDTO.floorNumber())
                .areaSqm(createApartmentDTO.areaSqm())
                .isAvailable(true) // Default value
                .roomsBookableSeparately(createApartmentDTO.roomsBookableSeparately())
                .hasKitchen(createApartmentDTO.hasKitchen())
                .hasLivingRoom(createApartmentDTO.hasLivingRoom())
                .hasDiningArea(createApartmentDTO.hasDiningArea())
                .hasBalcony(createApartmentDTO.hasBalcony())
                .hasWifi(createApartmentDTO.hasWifi())
                .hasAirConditioning(createApartmentDTO.hasAirConditioning())
                .hasParking(createApartmentDTO.hasParking())
                .hasLaundry(createApartmentDTO.hasLaundry())
                .apartmentType(createApartmentDTO.apartmentType())
                .hotel(hotel)
                .build();
    }

    public ApartmentResponseDTO toApartmentResponseDTO(Apartment apartment) {
        return new ApartmentResponseDTO(
                apartment.getId(),
                apartment.getApartmentNumber(),
                apartment.getName(),
                apartment.getDescription(),
                apartment.getImageUrl(),
                apartment.getPricePerNight(),
                apartment.getTotalCapacity(),
                apartment.getNumberOfBedrooms(),
                apartment.getNumberOfBathrooms(),
                apartment.getFloorNumber(),
                apartment.getAreaSqm(),
                apartment.getIsAvailable(),
                apartment.getRoomsBookableSeparately(),
                apartment.getHasKitchen(),
                apartment.getHasLivingRoom(),
                apartment.getHasDiningArea(),
                apartment.getHasBalcony(),
                apartment.getHasWifi(),
                apartment.getHasAirConditioning(),
                apartment.getHasParking(),
                apartment.getHasLaundry(),
                apartment.getApartmentType(),
                apartment.getHotel() != null ? apartment.getHotel().getId() : null,
                apartment.getHotel() != null ? apartment.getHotel().getName() : null
        );
    }

    // ****************************** ((Room)) ************************* //
    public Room toRoomEntity(CreateRoomDTO createRoomDTO, Hotel hotel, Apartment apartment) {
        return Room.builder()
                .roomNumber(createRoomDTO.roomNumber())
                .description(createRoomDTO.description())
                .imageUrl(createRoomDTO.imageUrl())
                .pricePerNight(createRoomDTO.pricePerNight())
                .capacity(createRoomDTO.capacity())
                .isAvailable(true) // Default value
                .hasWifi(createRoomDTO.hasWifi() != null ? createRoomDTO.hasWifi() : true)
                .hasAirConditioning(createRoomDTO.hasAirConditioning() != null ? createRoomDTO.hasAirConditioning() : true)
                .hasTv(createRoomDTO.hasTv() != null ? createRoomDTO.hasTv() : true)
                .hasMiniBar(createRoomDTO.hasMiniBar() != null ? createRoomDTO.hasMiniBar() : false)
                .hasBalcony(createRoomDTO.hasBalcony() != null ? createRoomDTO.hasBalcony() : false)
                .hasPrivateBathroom(createRoomDTO.hasPrivateBathroom() != null ? createRoomDTO.hasPrivateBathroom() : true)
                .bookableIndividually(createRoomDTO.bookableIndividually() != null ? createRoomDTO.bookableIndividually() : true)
                .roomType(createRoomDTO.roomType())
                .hotel(hotel)
                .apartment(apartment) // Can be null for standalone rooms
                .build();
    }

    public RoomResponseDTO toRoomResponseDTO(Room room) {
        return new RoomResponseDTO(
                room.getId(),
                room.getRoomNumber(),
                room.getDescription(),
                room.getImageUrl(),
                room.getPricePerNight(),
                room.getCapacity(),
                room.getIsAvailable(),
                room.getHasWifi(),
                room.getHasAirConditioning(),
                room.getHasTv(),
                room.getHasMiniBar(),
                room.getHasBalcony(),
                room.getHasPrivateBathroom(),
                room.getBookableIndividually(),
                room.getRoomType(),
                room.getHotel() != null ? room.getHotel().getId() : null,
                room.getHotel() != null ? room.getHotel().getName() : null,
                room.getApartment() != null ? room.getApartment().getId() : null,
                room.getApartment() != null ? room.getApartment().getName() : null,
                room.isPartOfApartment(),
                room.isStandaloneRoom()
        );
    }


    // ****************************** ((Review)) ************************* //
    public Review toEntity(CreateReviewDTO dto, User user, Hotel hotel,
                           Apartment apartment, Room room, Booking booking) {
        return Review.builder()
                .rating(dto.rating())
                .comment(dto.comment())
                .reviewType(dto.reviewType())
                .user(user)
                .hotel(hotel)
                .apartment(apartment)
                .room(room)
                .booking(booking)
                .build();
    }

    public ReviewResponseDTO toResponseDTO(Review review) {
        return new ReviewResponseDTO(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getReviewType(),
                // User Info
                review.getUser().getId(),
                review.getUser().getFirstName(),
                review.getUser().getLastName(),
                review.getUser().getProfileImageUrl(),
                // Hotel Info
                review.getHotel().getId(),
                review.getHotel().getName(),
                review.getHotel().getImageUrl(),
                review.getHotel().getAddress(),
                review.getHotel().getPhoneNumber(),
                review.getHotel().getRating(),
                // Apartment Info
                review.getApartment() != null ? review.getApartment().getId() : null,
                review.getApartment() != null ? review.getApartment().getName() : null,
                review.getApartment() != null ? review.getApartment().getImageUrl() : null,
                // Room Info
                review.getRoom() != null ? review.getRoom().getId() : null,
                review.getRoom() != null ? review.getRoom().getRoomNumber() : null,
                review.getRoom() != null ? review.getRoom().getImageUrl() : null,
                review.getRoom() != null ? review.getRoom().getCapacity() : null,

                review.getBooking() != null ? review.getBooking().getId() : null,
                review.getCreatedDate(),
                review.getLastModifiedDate()
        );
    }


    // ****************************** ((Booking)) ************************* //
    public Booking toBookingEntity(CreateBookingDTO createBookingDTO, User user, Hotel hotel,
                                   Apartment apartment, Room room) {
        return Booking.builder()
                .checkInDate(createBookingDTO.checkInDate())
                .checkOutDate(createBookingDTO.checkOutDate())
                .numberOfGuests(createBookingDTO.numberOfGuests())
                .bookingType(createBookingDTO.bookingType())
                .status(BookingStatus.PENDING)
                .user(user)
                .hotel(hotel)
                .apartment(apartment)
                .room(room)
                .build();
    }

    public BookingResponseDTO toBookingResponseDTO(Booking booking) {
        Payment payment = booking.getPayment();

        // Calculate expected amount and shortage
        BigDecimal expectedAmount = null;
        BigDecimal shortageAmount = null;
        Boolean hasShortage = false;

        if (booking.getCheckInDate() != null && booking.getCheckOutDate() != null) {
            long numberOfNights = ChronoUnit.DAYS.between(
                    booking.getCheckInDate(),
                    booking.getCheckOutDate()
            );

            if (numberOfNights > 0) {
                BigDecimal pricePerNight = null;

                if (booking.isApartmentBooking() && booking.getApartment() != null) {
                    pricePerNight = booking.getApartment().getPricePerNight();
                } else if (booking.isRoomBooking() && booking.getRoom() != null) {
                    pricePerNight = booking.getRoom().getPricePerNight();
                }

                if (pricePerNight != null) {
                    expectedAmount = pricePerNight.multiply(BigDecimal.valueOf(numberOfNights));

                    // Calculate shortage if payment exists and is REFUNDED
                    if (payment != null && payment.getStatus() == PaymentStatus.REFUNDED) {
                        shortageAmount = expectedAmount.subtract(payment.getAmount());
                        hasShortage = shortageAmount.compareTo(BigDecimal.ZERO) > 0;
                    }
                }
            }
        }

        return new BookingResponseDTO(
                booking.getId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getNumberOfGuests(),
                booking.getBookingType(),
                booking.getStatus(),
                booking.getCreatedDate(),
                booking.getLastModifiedDate(),

                // User information
                booking.getUser().getId(),
                booking.getUser().getFirstName(),
                booking.getUser().getLastName(),
                booking.getUser().getEmail(),
                booking.getUser().getProfileImageUrl(),

                // Hotel information
                booking.getHotel().getId(),
                booking.getHotel().getName(),
                booking.getHotel().getCity(),
                booking.getHotel().getCountry(),
                booking.getHotel().getImageUrl(),

                // Apartment information
                booking.getApartment() != null ? booking.getApartment().getId() : null,
                booking.getApartment() != null ? booking.getApartment().getApartmentNumber() : null,
                booking.getApartment() != null ? booking.getApartment().getName() : null,
                booking.getApartment() != null ? booking.getApartment().getPricePerNight() : null,
                booking.getApartment() != null ? booking.getApartment().getTotalCapacity() : null,
                booking.getApartment() != null ? booking.getApartment().getImageUrl() : null,
                booking.getApartment() != null ? booking.getApartment().getApartmentType() : null,

                // Room information
                booking.getRoom() != null ? booking.getRoom().getId() : null,
                booking.getRoom() != null ? booking.getRoom().getRoomNumber() : null,
                booking.getRoom() != null ? booking.getRoom().getPricePerNight() : null,
                booking.getRoom() != null ? booking.getRoom().getCapacity() : null,
                booking.getRoom() != null ? booking.getRoom().getImageUrl() : null,
                booking.getRoom() != null ? booking.getRoom().getRoomType() : null,

                // Booking type indicators
                booking.isApartmentBooking(),
                booking.isRoomBooking(),

                // Payment information
                payment != null ? payment.getId() : null,
                payment != null ? payment.getStatus() : null,
                payment != null ? payment.getAmount() : null,
                expectedAmount,
                shortageAmount,
                hasShortage
        );
    }


    // ****************************** ((Payment)) ************************* //
    public Payment toPaymentEntity(CreatePaymentDTO dto) {
        return Payment.builder()
                .amount(dto.amount())
                .notes(dto.notes())
                .build();
    }

    public PaymentResponseDTO toPaymentResponseDTO(Payment payment) {
        if (payment == null) return null;

        var user = payment.getUser();
        var booking = payment.getBooking();
        var apartment = (booking != null) ? booking.getApartment() : null;
        var room = (booking != null) ? booking.getRoom() : null;

        BigDecimal expectedAmount = null;
        BigDecimal shortageAmount = null;
        BigDecimal extraAmount = null;

        if (booking != null && booking.getCheckInDate() != null && booking.getCheckOutDate() != null) {
            long numberOfNights = ChronoUnit.DAYS.between(
                    booking.getCheckInDate(),
                    booking.getCheckOutDate()
            );

            if (numberOfNights > 0) {
                BigDecimal pricePerNight = null;

                if (booking.isApartmentBooking() && apartment != null) {
                    pricePerNight = apartment.getPricePerNight();
                } else if (booking.isRoomBooking() && room != null) {
                    pricePerNight = room.getPricePerNight();
                }

                if (pricePerNight != null) {
                    expectedAmount = pricePerNight.multiply(BigDecimal.valueOf(numberOfNights));

                    if (payment.getAmount() != null && expectedAmount != null) {
                        int comparison = payment.getAmount().compareTo(expectedAmount);

                        if (comparison < 0) {
                            shortageAmount = expectedAmount.subtract(payment.getAmount());
                        } else if (comparison > 0) {
                            extraAmount = payment.getAmount().subtract(expectedAmount);
                        }
                    }
                }
            }
        }

        return new PaymentResponseDTO(
                payment.getId(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getNotes(),
                payment.getCreatedDate(),
                payment.getLastModifiedDate(),

                (user != null) ? user.getId() : null,
                (user != null) ? user.getFirstName() : null,
                (user != null) ? user.getLastName() : null,
                (user != null) ? user.getProfileImageUrl() : null,

                (booking != null) ? booking.getId() : null,
                (booking != null) ? booking.getBookingType() : null,
                (booking != null) ? booking.getStatus() : null,
                (booking != null) ? booking.getCheckInDate() : null,
                (booking != null) ? booking.getCheckOutDate() : null,
                (booking != null) ? booking.getNumberOfGuests() : null,

                (apartment != null) ? apartment.getId() : null,
                (apartment != null) ? apartment.getApartmentNumber() : null,
                (apartment != null) ? apartment.getName() : null,
                (apartment != null) ? apartment.getImageUrl() : null,
                (apartment != null) ? apartment.getTotalCapacity() : null,
                (apartment != null) ? apartment.getPricePerNight() : null,
                (apartment != null) ? apartment.getApartmentType() : null,

                (room != null) ? room.getId() : null,
                (room != null) ? room.getRoomNumber() : null,
                (room != null) ? room.getImageUrl() : null,
                (room != null) ? room.getCapacity() : null,
                (room != null) ? room.getPricePerNight() : null,
                (room != null) ? room.getRoomType() : null,

                expectedAmount,
                shortageAmount,
                extraAmount
        );
    }


}
