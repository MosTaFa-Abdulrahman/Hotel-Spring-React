import * as S from "./roomCard.style";
import { useState, useEffect, useRef, useContext } from "react";
import {
  Users,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Home,
  Filter,
  Loader,
  AlertCircle,
  Calendar,
} from "lucide-react";

// RTKQ && Context
import { useGetStandaloneRoomsForHotelQuery } from "../../../store/room/roomSlice";
import { AuthContext } from "../../../context/AuthContext";

// Modals Components
import Booking from "../../booking/Booking";
import Payment from "../../payment/Payment";

// From ((Hotel.jsx)) Page
function RoomCard({ hotelId }) {
  const { currentUser } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const observerTarget = useRef(null);

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState({
    hotelId: null,
    roomId: null,
    apartmentId: null,
    maxCapacity: 1,
    maxPrice: 0,
  });
  const [createdBookingId, setCreatedBookingId] = useState(null);

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

  // RTKQ - Now with fixed infinite scroll
  const {
    data: roomsData,
    isLoading,
    isFetching,
    isError,
  } = useGetStandaloneRoomsForHotelQuery({
    hotelId,
    ...filters,
    page,
    size: 6,
  });

  // Get rooms from RTK Query (no manual accumulation needed!)
  const allRooms = roomsData?.data?.content || [];

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          roomsData?.data?.hasNext &&
          !isFetching
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [roomsData?.data?.hasNext, isFetching]);

  // Reset pagination when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Handle Room Booking
  const handleRoomBooking = (room) => {
    if (!currentUser) {
      alert("Please login to book a room");
      return;
    }

    setSelectedBookingData({
      hotelId: hotelId,
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

  // Loading && Error
  if (isLoading && page === 1) {
    return (
      <S.LoadingContainer>
        <Loader className="spinner" size={40} />
        <p>Loading rooms...</p>
      </S.LoadingContainer>
    );
  }
  if (isError) {
    return (
      <S.ErrorMessage>
        <AlertCircle size={24} />
        <span>Failed to load rooms. Please try again.</span>
      </S.ErrorMessage>
    );
  }

  return (
    <>
      <S.FilterButton onClick={() => setShowFilters(!showFilters)}>
        <Filter size={20} />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </S.FilterButton>

      {showFilters && (
        <S.FilterPanel>
          <S.FilterGrid>
            <S.FilterGroup>
              <S.FilterLabel>Room Number</S.FilterLabel>
              <S.FilterInput
                type="text"
                value={filters.roomNumber}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    roomNumber: e.target.value,
                  })
                }
                placeholder="Enter room number"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Room Type</S.FilterLabel>
              <S.FilterSelect
                value={filters.roomType}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    roomType: e.target.value,
                  })
                }
              >
                <option value="">All Types</option>
                <option value="SINGLE">Single</option>
                <option value="DOUBLE">Double</option>
                <option value="SUITE">Suite</option>
                <option value="DELUXE">Deluxe</option>
              </S.FilterSelect>
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Min Price</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.minPrice}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    minPrice: e.target.value,
                  })
                }
                placeholder="$0"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Max Price</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.maxPrice}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    maxPrice: e.target.value,
                  })
                }
                placeholder="$999"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Min Capacity</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.minCapacity}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    minCapacity: e.target.value,
                  })
                }
                placeholder="1"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Max Capacity</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.maxCapacity}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    maxCapacity: e.target.value,
                  })
                }
                placeholder="10"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Availability</S.FilterLabel>
              <S.FilterSelect
                value={
                  filters.isAvailable === null
                    ? ""
                    : filters.isAvailable.toString()
                }
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    isAvailable:
                      e.target.value === "" ? null : e.target.value === "true",
                  })
                }
              >
                <option value="">All</option>
                <option value="true">Available</option>
                <option value="false">Booked</option>
              </S.FilterSelect>
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Sort By</S.FilterLabel>
              <S.FilterSelect
                value={filters.sortBy}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    sortBy: e.target.value,
                  })
                }
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
                  handleFilterChange({
                    ...filters,
                    direction: e.target.value,
                  })
                }
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </S.FilterSelect>
            </S.FilterGroup>
          </S.FilterGrid>

          <S.FilterCheckboxGrid>
            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasWifi === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasWifi: e.target.checked ? true : null,
                  })
                }
              />
              WiFi
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasAirConditioning === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasAirConditioning: e.target.checked ? true : null,
                  })
                }
              />
              Air Conditioning
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasTv === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasTv: e.target.checked ? true : null,
                  })
                }
              />
              TV
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasMiniBar === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasMiniBar: e.target.checked ? true : null,
                  })
                }
              />
              Mini Bar
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasBalcony === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasBalcony: e.target.checked ? true : null,
                  })
                }
              />
              Balcony
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasPrivateBathroom === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasPrivateBathroom: e.target.checked ? true : null,
                  })
                }
              />
              Private Bathroom
            </S.CheckboxLabel>
          </S.FilterCheckboxGrid>
        </S.FilterPanel>
      )}

      {allRooms.length === 0 ? (
        <S.EmptyState>
          <Home size={60} />
          <h3>No Standalone Rooms Available</h3>
          <p>Check back later for available rooms</p>
        </S.EmptyState>
      ) : (
        <>
          <S.Grid>
            {allRooms.map((room) => (
              <S.Card key={room.id}>
                <S.CardImage
                  src={room.imageUrl || "/placeholder-room.jpg"}
                  alt={`Room ${room.roomNumber}`}
                />
                <S.CardBadges>
                  <S.AvailabilityBadge isAvailable={room.isAvailable}>
                    {room.isAvailable ? "Available" : "Booked"}
                  </S.AvailabilityBadge>
                  <S.TypeBadge>{room.roomType}</S.TypeBadge>
                </S.CardBadges>

                <S.CardContent>
                  <S.CardHeader>
                    <S.CardTitle>Room {room.roomNumber}</S.CardTitle>
                    <S.Price>${room.pricePerNight}</S.Price>
                  </S.CardHeader>

                  {room.description && (
                    <S.CardDescription>{room.description}</S.CardDescription>
                  )}

                  <S.InfoRow>
                    <S.InfoItem>
                      <Users size={18} />
                      <span>{room.capacity} Guests</span>
                    </S.InfoItem>
                  </S.InfoRow>

                  <S.AmenitiesGrid>
                    {room.hasWifi && (
                      <S.AmenityItem>
                        <Wifi size={16} />
                        WiFi
                      </S.AmenityItem>
                    )}
                    {room.hasAirConditioning && (
                      <S.AmenityItem>
                        <Wind size={16} />
                        AC
                      </S.AmenityItem>
                    )}
                    {room.hasTv && (
                      <S.AmenityItem>
                        <Tv size={16} />
                        TV
                      </S.AmenityItem>
                    )}
                    {room.hasMiniBar && (
                      <S.AmenityItem>
                        <Coffee size={16} />
                        Mini Bar
                      </S.AmenityItem>
                    )}
                  </S.AmenitiesGrid>

                  <S.BookButton
                    disabled={!room.isAvailable}
                    onClick={() => room.isAvailable && handleRoomBooking(room)}
                  >
                    <Calendar size={20} />
                    {room.isAvailable ? "Book Now" : "Not Available"}
                  </S.BookButton>
                </S.CardContent>
              </S.Card>
            ))}
          </S.Grid>

          <div ref={observerTarget} style={{ height: "20px" }} />

          {isFetching && page > 1 && (
            <S.LoadingMore>
              <Loader className="spinner" size={30} />
              <span>Loading more rooms...</span>
            </S.LoadingMore>
          )}
        </>
      )}

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
    </>
  );
}

export default RoomCard;
