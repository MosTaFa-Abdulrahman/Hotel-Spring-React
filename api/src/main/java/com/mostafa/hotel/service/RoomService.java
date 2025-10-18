package com.mostafa.hotel.service;

import com.mostafa.hotel.dto.room.CreateRoomDTO;
import com.mostafa.hotel.dto.room.RoomResponseDTO;
import com.mostafa.hotel.dto.room.UpdateRoomDTO;
import com.mostafa.hotel.enums.RoomType;
import com.mostafa.hotel.global.CustomResponseException;
import com.mostafa.hotel.mapper.EntityDtoMapper;
import com.mostafa.hotel.model.Apartment;
import com.mostafa.hotel.model.Hotel;
import com.mostafa.hotel.model.Room;
import com.mostafa.hotel.repository.ApartmentRepo;
import com.mostafa.hotel.repository.HotelRepo;
import com.mostafa.hotel.repository.RoomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepo roomRepo;
    private final ApartmentRepo apartmentRepo;
    private final HotelRepo hotelRepo;
    private final EntityDtoMapper mapper;


    //  Create
    public RoomResponseDTO createRoom(CreateRoomDTO dto) {
        Hotel hotel = hotelRepo.findById(dto.hotelId())
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Hotel not found with this ID: " + dto.hotelId()));
        // Fetch apartment only if apartmentId is provided (optional)
        Apartment apartment = null;
        if (dto.apartmentId() != null) {
            apartment = apartmentRepo.findById(dto.apartmentId())
                    .orElseThrow(() -> CustomResponseException.ResourceNotFound(
                            "Apartment not found with this ID: " + dto.apartmentId()));

            // Validate that the apartment belongs to the specified hotel
            if (!apartment.getHotel().getId().equals(hotel.getId())) {
                throw CustomResponseException.BadRequest(
                        "Apartment does not belong to the specified hotel");
            }
        }

        Room room = mapper.toRoomEntity(dto, hotel, apartment);
        Room savedRoom = roomRepo.save(room);

        return mapper.toRoomResponseDTO(savedRoom);
    }

    //  Update
    public RoomResponseDTO updateRoom(UUID roomId, UpdateRoomDTO dto) {
        Room existingRoom = roomRepo.findById(roomId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Room not found with this ID: " + roomId));

        if (dto.roomNumber() != null) {
            existingRoom.setRoomNumber(dto.roomNumber());
        }
        if (dto.description() != null) {
            existingRoom.setDescription(dto.description());
        }
        if (dto.imageUrl() != null) {
            existingRoom.setImageUrl(dto.imageUrl());
        }
        if (dto.pricePerNight() != null) {
            existingRoom.setPricePerNight(dto.pricePerNight());
        }
        if (dto.capacity() != null) {
            existingRoom.setCapacity(dto.capacity());
        }
        if (dto.isAvailable() != null) {
            existingRoom.setIsAvailable(dto.isAvailable());
        }
        if (dto.hasWifi() != null) {
            existingRoom.setHasWifi(dto.hasWifi());
        }
        if (dto.hasAirConditioning() != null) {
            existingRoom.setHasAirConditioning(dto.hasAirConditioning());
        }
        if (dto.hasTv() != null) {
            existingRoom.setHasTv(dto.hasTv());
        }
        if (dto.hasMiniBar() != null) {
            existingRoom.setHasMiniBar(dto.hasMiniBar());
        }
        if (dto.hasBalcony() != null) {
            existingRoom.setHasBalcony(dto.hasBalcony());
        }
        if (dto.hasPrivateBathroom() != null) {
            existingRoom.setHasPrivateBathroom(dto.hasPrivateBathroom());
        }
        if (dto.bookableIndividually() != null) {
            existingRoom.setBookableIndividually(dto.bookableIndividually());
        }
        if (dto.roomType() != null) {
            existingRoom.setRoomType(dto.roomType());
        }
        if (dto.hotelId() != null) {
            Hotel hotel = hotelRepo.findById(dto.hotelId())
                    .orElseThrow(() -> CustomResponseException.ResourceNotFound("Hotel not Found with this ID: " + dto.hotelId()));
            existingRoom.setHotel(hotel);
        }
        if (dto.apartmentId() != null) {
            Apartment apartment = apartmentRepo.findById(dto.apartmentId())
                    .orElseThrow(() -> CustomResponseException.ResourceNotFound("Apartment not Found with this ID: " + dto.apartmentId()));
            existingRoom.setApartment(apartment);
        }


        Room updatedRoom = roomRepo.save(existingRoom);

        return mapper.toRoomResponseDTO(updatedRoom);
    }

    //  Delete
    public String deleteRoom(UUID roomId) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Room not found with this ID: " + roomId));

        roomRepo.delete(room);

        return "Room Deleted Success 🤞";
    }

    //  Get Single
    public RoomResponseDTO getRoom(UUID roomId) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> CustomResponseException.ResourceNotFound("Room not found with this ID: " + roomId));

        return mapper.toRoomResponseDTO(room);
    }

    //    Get All
    public Page<RoomResponseDTO> getAll(
            String roomNumber,
            RoomType roomType,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            Integer maxCapacity,
            Boolean isAvailable,
            Boolean hasWifi,
            Boolean hasAirConditioning,
            Boolean hasTv,
            Boolean hasMiniBar,
            Boolean hasBalcony,
            Boolean hasPrivateBathroom,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Room> roomsPage = roomRepo.advancedSearchAllRooms(
                roomNumber,
                roomType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                isAvailable,
                hasWifi,
                hasAirConditioning,
                hasTv,
                hasMiniBar,
                hasBalcony,
                hasPrivateBathroom,
                pageable
        );

        return roomsPage.map(mapper::toRoomResponseDTO);
    }


    // ***************************** ((Specifications)) *********************** //
    /*
     * Get All Rooms for ((Specific-Apartment))
     * With Advanced Search 🤞
     */
    public Page<RoomResponseDTO> getAllForApartment(
            UUID apartmentId,
            String roomNumber,
            RoomType roomType,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            Integer maxCapacity,
            Boolean isAvailable,
            Boolean hasWifi,
            Boolean hasAirConditioning,
            Boolean hasTv,
            Boolean hasMiniBar,
            Boolean hasBalcony,
            Boolean hasPrivateBathroom,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Room> roomsPage = roomRepo.searchRoomsForApartment(
                apartmentId,
                roomNumber,
                roomType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                isAvailable,
                hasWifi,
                hasAirConditioning,
                hasTv,
                hasMiniBar,
                hasBalcony,
                hasPrivateBathroom,
                pageable
        );

        return roomsPage.map(mapper::toRoomResponseDTO);
    }


    /*
     * Get All Standalone Rooms for ((Specific-Hotel)) - Not belonging to any apartment
     * With Advanced Search 🤞
     */
    public Page<RoomResponseDTO> getAllStandaloneRoomsWithSearchForHotel(
            UUID hotelId,
            String roomNumber,
            RoomType roomType,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            Integer maxCapacity,
            Boolean isAvailable,
            Boolean hasWifi,
            Boolean hasAirConditioning,
            Boolean hasTv,
            Boolean hasMiniBar,
            Boolean hasBalcony,
            Boolean hasPrivateBathroom,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Room> roomsPage = roomRepo.searchStandaloneRooms(
                hotelId,
                roomNumber,
                roomType,
                minPrice,
                maxPrice,
                minCapacity,
                maxCapacity,
                isAvailable,
                hasWifi,
                hasAirConditioning,
                hasTv,
                hasMiniBar,
                hasBalcony,
                hasPrivateBathroom,
                pageable
        );

        return roomsPage.map(mapper::toRoomResponseDTO);
    }


}
