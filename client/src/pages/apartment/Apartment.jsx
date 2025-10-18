import * as S from "./apartment.style";
import { useState, useEffect, useRef, useContext } from "react";
import {
  Wifi,
  Wind,
  Tv,
  Coffee,
  Home,
  Users,
  DollarSign,
  MapPin,
  Bed,
  Bath,
  Utensils,
  Sofa,
  Car,
  WashingMachine,
  Filter,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";

// RTKQ && Context
import { useGetApartmentQuery } from "../../store/apartment/apartmentSlice";
import { useGetRoomsForApartmentQuery } from "../../store/room/roomSlice";
import { AuthContext } from "../../context/AuthContext";

// Import Modal Components
import Booking from "../../components/booking/Booking";
import Payment from "../../components/payment/Payment";

function Apartment() {
  const { apartmentId } = useParams();

  // Context
  const { currentUser } = useContext(AuthContext);

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState({
    hotelId: null,
    roomId: null,
    apartmentId: null,
    maxCapacity: 1,
    maxPrice: 0, // Keep this for payment
  });
  const [createdBookingId, setCreatedBookingId] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    roomNumber: "",
    roomType: "",
    minPrice: "",
    maxPrice: "",
    minCapacity: "",
    maxCapacity: "",
    isAvailable: null,
    hasWifi: null,
    hasAirConditioning: null,
    hasTv: null,
    hasMiniBar: null,
    hasBalcony: null,
    hasPrivateBathroom: null,
    sortBy: "pricePerNight",
    direction: "ASC",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [showFilters, setShowFilters] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const previousFiltersRef = useRef(filters);

  // Debouncing effect for filters
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [
    filters.roomNumber,
    filters.roomType,
    filters.minPrice,
    filters.maxPrice,
    filters.minCapacity,
    filters.maxCapacity,
    filters.isAvailable,
    filters.hasWifi,
    filters.hasAirConditioning,
    filters.hasTv,
    filters.hasMiniBar,
    filters.hasBalcony,
    filters.hasPrivateBathroom,
    filters.sortBy,
    filters.direction,
  ]);

  // Check if filters changed
  useEffect(() => {
    const filtersChanged =
      JSON.stringify(previousFiltersRef.current) !== JSON.stringify(filters);

    if (filtersChanged) {
      setCurrentPage(1);
      setAllRooms([]);
      previousFiltersRef.current = filters;
    }
  }, [filters]);

  // RTKQ - Fetch apartment
  const { data: apartment, isLoading: apartmentLoading } =
    useGetApartmentQuery(apartmentId);

  // RTKQ - Fetch rooms
  const {
    data: roomsData,
    isLoading: roomsLoading,
    isFetching,
  } = useGetRoomsForApartmentQuery({
    apartmentId,
    ...debouncedFilters,
    page: currentPage,
    size: 10,
  });

  // Accumulate rooms when new data arrives
  useEffect(() => {
    if (roomsData?.data?.content) {
      setAllRooms((prev) => {
        if (currentPage === 1) {
          return roomsData.data.content;
        }

        const existingIds = new Set(prev.map((room) => room.id));
        const newRooms = roomsData.data.content.filter(
          (room) => !existingIds.has(room.id)
        );

        return [...prev, ...newRooms];
      });
    }
  }, [roomsData, currentPage]);

  // Handle Apartment Booking
  const handleApartmentBooking = () => {
    if (!currentUser) {
      alert("Please login to book an apartment");
      return;
    }

    setSelectedBookingData({
      hotelId: apartment.hotelId,
      roomId: null,
      apartmentId: apartment.id,
      maxCapacity: apartment.totalCapacity,
      maxPrice: apartment.pricePerNight,
    });
    setIsBookingOpen(true);
  };

  // Handle Room Booking
  const handleRoomBooking = (room) => {
    if (!currentUser) {
      alert("Please login to book a room");
      return;
    }

    setSelectedBookingData({
      hotelId: apartment.hotelId,
      roomId: room.id,
      apartmentId: null,
      maxCapacity: room.capacity,
      maxPrice: room.pricePerNight,
    });
    setIsBookingOpen(true);
  };

  // Handle Booking Success - Open Payment Modal
  const handleBookingSuccess = (bookingId) => {
    setCreatedBookingId(bookingId);
    setIsBookingOpen(false);
    setIsPaymentOpen(true);
  };

  // Handle Payment Success
  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    setCreatedBookingId(null);
    setSelectedBookingData({
      hotelId: null,
      roomId: null,
      apartmentId: null,
      maxCapacity: 1,
      maxPrice: 0,
    });
    alert("Booking and Payment completed successfully!");
  };

  // Close Booking Modal
  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedBookingData({
      hotelId: null,
      roomId: null,
      apartmentId: null,
      maxCapacity: 1,
      maxPrice: 0,
    });
  };

  // Close Payment Modal
  const closePaymentModal = () => {
    setIsPaymentOpen(false);
    setCreatedBookingId(null);
  };

  // Handle filter change
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change (3-state)
  const handleCheckboxChange = (name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name] === null ? true : prev[name] === true ? false : null,
    }));
  };

  // Load more rooms
  const handleLoadMore = () => {
    if (roomsData?.data?.hasNext && !isFetching) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      roomNumber: "",
      roomType: "",
      minPrice: "",
      maxPrice: "",
      minCapacity: "",
      maxCapacity: "",
      isAvailable: null,
      hasWifi: null,
      hasAirConditioning: null,
      hasTv: null,
      hasMiniBar: null,
      hasBalcony: null,
      hasPrivateBathroom: null,
      sortBy: "pricePerNight",
      direction: "ASC",
    });
    setCurrentPage(1);
    setAllRooms([]);
  };

  const getCheckboxState = (value) => {
    if (value === true) return "yes";
    if (value === false) return "no";
    return "all";
  };

  if (apartmentLoading) {
    return (
      <S.LoadingContainer>
        <S.Spinner />
        <p>Loading apartment...</p>
      </S.LoadingContainer>
    );
  }

  if (!apartment) {
    return (
      <S.ErrorContainer>
        <p>Apartment not found</p>
      </S.ErrorContainer>
    );
  }

  return (
    <S.Container>
      {/* Apartment Section */}
      <S.ApartmentSection>
        <S.ApartmentCard>
          <S.ApartmentImage src={apartment?.imageUrl} alt={apartment.name} />
          <S.ApartmentInfo>
            <S.ApartmentHeader>
              <div>
                <S.ApartmentNumber>
                  {apartment.apartmentNumber}
                </S.ApartmentNumber>
                <S.ApartmentTitle>{apartment.name}</S.ApartmentTitle>
                <S.HotelName>
                  <MapPin size={16} />
                  {apartment.hotelName}
                </S.HotelName>
              </div>
              {!apartment.roomsBookableSeparately && (
                <S.BookButton onClick={handleApartmentBooking}>
                  Book Now
                </S.BookButton>
              )}
            </S.ApartmentHeader>
            <S.ApartmentDescription>
              {apartment.description}
            </S.ApartmentDescription>
            <S.ApartmentDetails>
              <S.DetailItem>
                <DollarSign size={20} />
                <div>
                  <strong>${apartment.pricePerNight}</strong>
                  <span>per night</span>
                </div>
              </S.DetailItem>

              <S.DetailItem>
                <Users size={20} />
                <div>
                  <strong>{apartment.totalCapacity}</strong>
                  <span>guests</span>
                </div>
              </S.DetailItem>

              <S.DetailItem>
                <Bed size={20} />
                <div>
                  <strong>{apartment.numberOfBedrooms}</strong>
                  <span>bedrooms</span>
                </div>
              </S.DetailItem>

              <S.DetailItem>
                <Bath size={20} />
                <div>
                  <strong>{apartment.numberOfBathrooms}</strong>
                  <span>bathrooms</span>
                </div>
              </S.DetailItem>

              <S.DetailItem>
                <Home size={20} />
                <div>
                  <strong>Floor {apartment.floorNumber}</strong>
                  <span>{apartment.areaSqm} sqm</span>
                </div>
              </S.DetailItem>
            </S.ApartmentDetails>
            <S.AmenitiesGrid>
              {apartment.hasWifi && (
                <S.AmenityBadge>
                  <Wifi size={16} />
                  WiFi
                </S.AmenityBadge>
              )}
              {apartment.hasAirConditioning && (
                <S.AmenityBadge>
                  <Wind size={16} />
                  A/C
                </S.AmenityBadge>
              )}
              {apartment.hasKitchen && (
                <S.AmenityBadge>
                  <Utensils size={16} />
                  Kitchen
                </S.AmenityBadge>
              )}
              {apartment.hasLivingRoom && (
                <S.AmenityBadge>
                  <Sofa size={16} />
                  Living Room
                </S.AmenityBadge>
              )}
              {apartment.hasBalcony && (
                <S.AmenityBadge>
                  <Home size={16} />
                  Balcony
                </S.AmenityBadge>
              )}
              {apartment.hasParking && (
                <S.AmenityBadge>
                  <Car size={16} />
                  Parking
                </S.AmenityBadge>
              )}
              {apartment.hasLaundry && (
                <S.AmenityBadge>
                  <WashingMachine size={16} />
                  Laundry
                </S.AmenityBadge>
              )}
            </S.AmenitiesGrid>
            <S.AvailabilityBadge available={apartment.isAvailable}>
              {apartment.isAvailable ? "Available" : "Not Available"}
            </S.AvailabilityBadge>
          </S.ApartmentInfo>
        </S.ApartmentCard>
      </S.ApartmentSection>

      {/* Rooms Section */}
      <S.RoomsSection>
        <S.SectionHeader>
          <S.SectionTitle>
            Rooms in this Apartment ({roomsData?.data?.totalItems || 0} total)
          </S.SectionTitle>
          <S.FilterToggle onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <X size={20} /> : <Filter size={20} />}
            {showFilters ? "Hide Filters" : "Show Filters"}
          </S.FilterToggle>
        </S.SectionHeader>

        {/* Filters */}
        {showFilters && (
          <S.FilterContainer>
            <S.FilterRow>
              <S.FilterGroup>
                <S.FilterLabel>Room Number</S.FilterLabel>
                <S.FilterInput
                  type="text"
                  placeholder="Search room number..."
                  value={filters.roomNumber}
                  onChange={(e) =>
                    handleFilterChange("roomNumber", e.target.value)
                  }
                />
              </S.FilterGroup>

              <S.FilterGroup>
                <S.FilterLabel>Room Type</S.FilterLabel>
                <S.FilterSelect
                  value={filters.roomType}
                  onChange={(e) =>
                    handleFilterChange("roomType", e.target.value)
                  }
                >
                  <option value="">All Types</option>
                  <option value="BEDROOM">Bedroom</option>
                  <option value="MASTER_BEDROOM">Master Bedroom</option>
                  <option value="SINGLE_BEDROOM">Single Bedroom</option>
                  <option value="DOUBLE_BEDROOM">Double Bedroom</option>
                  <option value="STANDARD">Standard</option>
                  <option value="DELUXE">Deluxe</option>
                  <option value="SUITE">Suite</option>
                  <option value="PRESIDENTIAL_SUITE">Presidential Suite</option>
                  <option value="FAMILY_ROOM">Family Room</option>
                </S.FilterSelect>
              </S.FilterGroup>

              <S.FilterGroup>
                <S.FilterLabel>Sort By</S.FilterLabel>
                <S.FilterSelect
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="pricePerNight">Price</option>
                  <option value="capacity">Capacity</option>
                  <option value="roomNumber">Room Number</option>
                </S.FilterSelect>
              </S.FilterGroup>

              <S.FilterGroup>
                <S.FilterLabel>Direction</S.FilterLabel>
                <S.FilterSelect
                  value={filters.direction}
                  onChange={(e) =>
                    handleFilterChange("direction", e.target.value)
                  }
                >
                  <option value="ASC">Ascending</option>
                  <option value="DESC">Descending</option>
                </S.FilterSelect>
              </S.FilterGroup>
            </S.FilterRow>

            <S.FilterRow>
              <S.FilterGroup>
                <S.FilterLabel>Min Price</S.FilterLabel>
                <S.FilterInput
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                />
              </S.FilterGroup>

              <S.FilterGroup>
                <S.FilterLabel>Max Price</S.FilterLabel>
                <S.FilterInput
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                />
              </S.FilterGroup>

              <S.FilterGroup>
                <S.FilterLabel>Min Capacity</S.FilterLabel>
                <S.FilterInput
                  type="number"
                  placeholder="Min capacity"
                  value={filters.minCapacity}
                  onChange={(e) =>
                    handleFilterChange("minCapacity", e.target.value)
                  }
                />
              </S.FilterGroup>

              <S.FilterGroup>
                <S.FilterLabel>Max Capacity</S.FilterLabel>
                <S.FilterInput
                  type="number"
                  placeholder="Max capacity"
                  value={filters.maxCapacity}
                  onChange={(e) =>
                    handleFilterChange("maxCapacity", e.target.value)
                  }
                />
              </S.FilterGroup>
            </S.FilterRow>

            <S.FilterRow>
              <S.CheckboxGroup>
                <S.CheckboxLabel>
                  <S.FilterCheckbox
                    type="checkbox"
                    checked={getCheckboxState(filters.isAvailable) === "yes"}
                    onChange={() => handleCheckboxChange("isAvailable")}
                  />
                  Available
                  {getCheckboxState(filters.isAvailable) === "no" && " (No)"}
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                  <S.FilterCheckbox
                    type="checkbox"
                    checked={getCheckboxState(filters.hasWifi) === "yes"}
                    onChange={() => handleCheckboxChange("hasWifi")}
                  />
                  WiFi
                  {getCheckboxState(filters.hasWifi) === "no" && " (No)"}
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                  <S.FilterCheckbox
                    type="checkbox"
                    checked={
                      getCheckboxState(filters.hasAirConditioning) === "yes"
                    }
                    onChange={() => handleCheckboxChange("hasAirConditioning")}
                  />
                  A/C
                  {getCheckboxState(filters.hasAirConditioning) === "no" &&
                    " (No)"}
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                  <S.FilterCheckbox
                    type="checkbox"
                    checked={getCheckboxState(filters.hasTv) === "yes"}
                    onChange={() => handleCheckboxChange("hasTv")}
                  />
                  TV
                  {getCheckboxState(filters.hasTv) === "no" && " (No)"}
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                  <S.FilterCheckbox
                    type="checkbox"
                    checked={getCheckboxState(filters.hasMiniBar) === "yes"}
                    onChange={() => handleCheckboxChange("hasMiniBar")}
                  />
                  Mini Bar
                  {getCheckboxState(filters.hasMiniBar) === "no" && " (No)"}
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                  <S.FilterCheckbox
                    type="checkbox"
                    checked={getCheckboxState(filters.hasBalcony) === "yes"}
                    onChange={() => handleCheckboxChange("hasBalcony")}
                  />
                  Balcony
                  {getCheckboxState(filters.hasBalcony) === "no" && " (No)"}
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                  <S.FilterCheckbox
                    type="checkbox"
                    checked={
                      getCheckboxState(filters.hasPrivateBathroom) === "yes"
                    }
                    onChange={() => handleCheckboxChange("hasPrivateBathroom")}
                  />
                  Private Bath
                  {getCheckboxState(filters.hasPrivateBathroom) === "no" &&
                    " (No)"}
                </S.CheckboxLabel>
              </S.CheckboxGroup>
            </S.FilterRow>

            <S.FilterActions>
              <S.ResetButton onClick={resetFilters}>
                Reset Filters
              </S.ResetButton>
            </S.FilterActions>
          </S.FilterContainer>
        )}

        {/* Rooms List */}
        {roomsLoading && currentPage === 1 ? (
          <S.LoadingContainer>
            <S.Spinner />
            <p>Loading rooms...</p>
          </S.LoadingContainer>
        ) : allRooms.length === 0 ? (
          <S.NoResults>
            <p>No rooms found matching your criteria</p>
          </S.NoResults>
        ) : (
          <>
            <S.RoomsList>
              {allRooms.map((room) => (
                <S.RoomCard key={room.id}>
                  <S.RoomImageContainer>
                    <S.RoomImage
                      src={
                        room?.imageUrl ||
                        "https://images.unsplash.com/photo-1689267166689-795f4f536819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRlZmF1bHR8ZW58MHx8MHx8fDA%3D"
                      }
                      alt={room.roomNumber}
                    />
                    <S.RoomAvailabilityBadge available={room.isAvailable}>
                      {room.isAvailable ? "Available" : "Booked"}
                    </S.RoomAvailabilityBadge>
                  </S.RoomImageContainer>

                  <S.RoomDetails>
                    <S.RoomHeader>
                      <div>
                        <S.RoomNumber>Room {room.roomNumber}</S.RoomNumber>
                        <S.RoomType>
                          {room.roomType.replace(/_/g, " ")}
                        </S.RoomType>
                      </div>
                      {apartment.roomsBookableSeparately &&
                        room.bookableIndividually && (
                          <S.RoomBookButton
                            onClick={() => handleRoomBooking(room)}
                          >
                            Book Now
                          </S.RoomBookButton>
                        )}
                    </S.RoomHeader>

                    <S.RoomDescription>{room.description}</S.RoomDescription>

                    <S.RoomInfo>
                      <S.RoomInfoItem>
                        <DollarSign size={18} />
                        <span>${room.pricePerNight}/night</span>
                      </S.RoomInfoItem>
                      <S.RoomInfoItem>
                        <Users size={18} />
                        <span>{room.capacity} guests</span>
                      </S.RoomInfoItem>
                    </S.RoomInfo>

                    <S.RoomAmenities>
                      {room.hasWifi && (
                        <S.AmenityIcon title="WiFi">
                          <Wifi size={18} />
                        </S.AmenityIcon>
                      )}
                      {room.hasAirConditioning && (
                        <S.AmenityIcon title="Air Conditioning">
                          <Wind size={18} />
                        </S.AmenityIcon>
                      )}
                      {room.hasTv && (
                        <S.AmenityIcon title="TV">
                          <Tv size={18} />
                        </S.AmenityIcon>
                      )}
                      {room.hasMiniBar && (
                        <S.AmenityIcon title="Mini Bar">
                          <Coffee size={18} />
                        </S.AmenityIcon>
                      )}
                      {room.hasBalcony && (
                        <S.AmenityIcon title="Balcony">
                          <Home size={18} />
                        </S.AmenityIcon>
                      )}
                      {room.hasPrivateBathroom && (
                        <S.AmenityIcon title="Private Bathroom">
                          <Bath size={18} />
                        </S.AmenityIcon>
                      )}
                    </S.RoomAmenities>
                  </S.RoomDetails>
                </S.RoomCard>
              ))}
            </S.RoomsList>

            {roomsData?.data?.hasNext && (
              <S.LoadMoreContainer>
                <S.LoadMoreButton
                  onClick={handleLoadMore}
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <>
                      <S.Spinner size={20} />
                      Loading more...
                    </>
                  ) : (
                    `Load More Rooms (${allRooms.length} of ${roomsData?.data?.totalItems})`
                  )}
                </S.LoadMoreButton>
              </S.LoadMoreContainer>
            )}
          </>
        )}
      </S.RoomsSection>

      {/* Booking Modal */}
      <Booking
        isOpen={isBookingOpen}
        onClose={closeBookingModal}
        hotelId={selectedBookingData.hotelId}
        roomId={selectedBookingData.roomId}
        apartmentId={selectedBookingData.apartmentId}
        userId={currentUser?.id}
        maxCapacity={selectedBookingData.maxCapacity}
        onSuccess={handleBookingSuccess}
      />

      {/* Payment Modal */}
      <Payment
        isOpen={isPaymentOpen}
        onClose={closePaymentModal}
        bookingId={createdBookingId}
        maxPrice={selectedBookingData.maxPrice}
        onSuccess={handlePaymentSuccess}
      />
    </S.Container>
  );
}

export default Apartment;
