import * as S from "./apartmentCard.style";
import { useState, useEffect, useRef } from "react";
import {
  Users,
  Wifi,
  Wind,
  Home,
  Filter,
  Loader,
  AlertCircle,
  Bed,
  Bath,
  Square,
  Building,
  UtensilsCrossed,
  Sofa,
  Car,
  WashingMachine,
  Eye,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// RTKQ
import { useGetApartmentsForHotelQuery } from "../../../store/apartment/apartmentSlice";

// From ((Hotel.jsx)) Page
function ApartmentCard({ hotelId }) {
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const observerTarget = useRef(null);

  const [filters, setFilters] = useState({
    apartmentNumber: "",
    name: "",
    apartmentType: "",
    minPrice: "",
    maxPrice: "",
    minCapacity: "",
    maxCapacity: "",
    minBedrooms: "",
    maxBedrooms: "",
    minBathrooms: "",
    maxBathrooms: "",
    floorNumber: "",
    minArea: "",
    maxArea: "",
    isAvailable: null,
    roomsBookableSeparately: null,
    hasKitchen: null,
    hasLivingRoom: null,
    hasDiningArea: null,
    hasBalcony: null,
    hasWifi: null,
    hasAirConditioning: null,
    hasParking: null,
    hasLaundry: null,
    sortBy: "pricePerNight",
    direction: "ASC",
  });

  // RTKQ - Now with fixed infinite scroll
  const {
    data: apartmentsData,
    isLoading,
    isFetching,
    isError,
  } = useGetApartmentsForHotelQuery({
    hotelId,
    ...filters,
    page,
    size: 6,
  });

  // Get apartments from RTK Query (no manual accumulation needed!)
  const allApartments = apartmentsData?.data?.content || [];

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          apartmentsData?.data?.hasNext &&
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
  }, [apartmentsData?.data?.hasNext, isFetching]);

  // Reset pagination when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Loading && Error
  if (isLoading && page === 1) {
    return (
      <S.LoadingContainer>
        <Loader className="spinner" size={40} />
        <p>Loading apartments...</p>
      </S.LoadingContainer>
    );
  }
  if (isError) {
    return (
      <S.ErrorMessage>
        <AlertCircle size={24} />
        <span>Failed to load apartments. Please try again.</span>
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
              <S.FilterLabel>Apartment Number</S.FilterLabel>
              <S.FilterInput
                type="text"
                value={filters.apartmentNumber}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    apartmentNumber: e.target.value,
                  })
                }
                placeholder="Enter apartment number"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Name</S.FilterLabel>
              <S.FilterInput
                type="text"
                value={filters.name}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    name: e.target.value,
                  })
                }
                placeholder="Enter name"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Apartment Type</S.FilterLabel>
              <S.FilterSelect
                value={filters.apartmentType}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    apartmentType: e.target.value,
                  })
                }
              >
                <option value="">All Types</option>
                <option value="STUDIO">Studio</option>
                <option value="ONE_BEDROOM">One Bedroom</option>
                <option value="TWO_BEDROOM">Two Bedroom</option>
                <option value="PENTHOUSE">Penthouse</option>
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
              <S.FilterLabel>Min Bedrooms</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.minBedrooms}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    minBedrooms: e.target.value,
                  })
                }
                placeholder="0"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Max Bedrooms</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.maxBedrooms}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    maxBedrooms: e.target.value,
                  })
                }
                placeholder="10"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Min Bathrooms</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.minBathrooms}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    minBathrooms: e.target.value,
                  })
                }
                placeholder="0"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Max Bathrooms</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.maxBathrooms}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    maxBathrooms: e.target.value,
                  })
                }
                placeholder="10"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Floor Number</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.floorNumber}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    floorNumber: e.target.value,
                  })
                }
                placeholder="Any floor"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Min Area (sq ft)</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.minArea}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    minArea: e.target.value,
                  })
                }
                placeholder="0"
              />
            </S.FilterGroup>

            <S.FilterGroup>
              <S.FilterLabel>Max Area (sq ft)</S.FilterLabel>
              <S.FilterInput
                type="number"
                value={filters.maxArea}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    maxArea: e.target.value,
                  })
                }
                placeholder="10000"
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
              <S.FilterLabel>Bookable Separately</S.FilterLabel>
              <S.FilterSelect
                value={
                  filters.roomsBookableSeparately === null
                    ? ""
                    : filters.roomsBookableSeparately.toString()
                }
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    roomsBookableSeparately:
                      e.target.value === "" ? null : e.target.value === "true",
                  })
                }
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
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
                <option value="bedrooms">Bedrooms</option>
                <option value="area">Area</option>
                <option value="floorNumber">Floor</option>
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
                checked={filters.hasKitchen === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasKitchen: e.target.checked ? true : null,
                  })
                }
              />
              Kitchen
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasLivingRoom === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasLivingRoom: e.target.checked ? true : null,
                  })
                }
              />
              Living Room
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasDiningArea === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasDiningArea: e.target.checked ? true : null,
                  })
                }
              />
              Dining Area
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
                checked={filters.hasParking === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasParking: e.target.checked ? true : null,
                  })
                }
              />
              Parking
            </S.CheckboxLabel>

            <S.CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hasLaundry === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    hasLaundry: e.target.checked ? true : null,
                  })
                }
              />
              Laundry
            </S.CheckboxLabel>
          </S.FilterCheckboxGrid>
        </S.FilterPanel>
      )}

      {allApartments.length === 0 ? (
        <S.EmptyState>
          <Home size={60} />
          <h3>No Apartments Available</h3>
          <p>Check back later for available apartments</p>
        </S.EmptyState>
      ) : (
        <>
          <S.Grid>
            {allApartments.map((apartment) => (
              <S.Card key={apartment.id}>
                <S.CardImage
                  src={apartment.imageUrl || "/placeholder-apartment.jpg"}
                  alt={apartment.name}
                />
                <S.CardBadges>
                  <S.AvailabilityBadge isAvailable={apartment.isAvailable}>
                    {apartment.isAvailable ? "Available" : "Booked"}
                  </S.AvailabilityBadge>
                  <S.TypeBadge>{apartment.apartmentType}</S.TypeBadge>
                </S.CardBadges>

                <S.CardContent>
                  <S.CardHeader>
                    <S.CardTitle>{apartment.name}</S.CardTitle>
                    <S.Price>${apartment.pricePerNight}</S.Price>
                  </S.CardHeader>

                  {apartment.description && (
                    <S.CardDescription>
                      {apartment.description}
                    </S.CardDescription>
                  )}

                  <S.ApartmentDetails>
                    <span>
                      <Bed
                        size={16}
                        style={{ display: "inline", marginRight: "4px" }}
                      />
                      {apartment.bedrooms} Bed
                    </span>
                    <span>•</span>
                    <span>
                      <Bath
                        size={16}
                        style={{ display: "inline", marginRight: "4px" }}
                      />
                      {apartment.bathrooms} Bath
                    </span>
                    <span>•</span>
                    <span>
                      <Square
                        size={16}
                        style={{ display: "inline", marginRight: "4px" }}
                      />
                      {apartment.area} sq ft
                    </span>
                    <span>•</span>
                    <span>
                      <Building
                        size={16}
                        style={{ display: "inline", marginRight: "4px" }}
                      />
                      Floor {apartment.floorNumber}
                    </span>
                  </S.ApartmentDetails>

                  <S.InfoRow>
                    <S.InfoItem>
                      <Users size={18} />
                      <span>{apartment.capacity} Guests</span>
                    </S.InfoItem>
                  </S.InfoRow>

                  <S.AmenitiesGrid>
                    {apartment.hasKitchen && (
                      <S.AmenityItem>
                        <UtensilsCrossed size={16} />
                        Kitchen
                      </S.AmenityItem>
                    )}
                    {apartment.hasLivingRoom && (
                      <S.AmenityItem>
                        <Sofa size={16} />
                        Living Room
                      </S.AmenityItem>
                    )}
                    {apartment.hasWifi && (
                      <S.AmenityItem>
                        <Wifi size={16} />
                        WiFi
                      </S.AmenityItem>
                    )}
                    {apartment.hasAirConditioning && (
                      <S.AmenityItem>
                        <Wind size={16} />
                        AC
                      </S.AmenityItem>
                    )}
                    {apartment.hasParking && (
                      <S.AmenityItem>
                        <Car size={16} />
                        Parking
                      </S.AmenityItem>
                    )}
                    {apartment.hasLaundry && (
                      <S.AmenityItem>
                        <WashingMachine size={16} />
                        Laundry
                      </S.AmenityItem>
                    )}
                  </S.AmenitiesGrid>

                  <S.BookButton disabled={!apartment.isAvailable}>
                    <Eye size={20} />
                    {apartment.isAvailable ? (
                      <NavLink
                        to={`/apartments/${apartment.id}`}
                        className="link"
                      >
                        See More
                      </NavLink>
                    ) : (
                      "Not Available"
                    )}
                  </S.BookButton>
                </S.CardContent>
              </S.Card>
            ))}
          </S.Grid>

          <div ref={observerTarget} style={{ height: "20px" }} />

          {isFetching && page > 1 && (
            <S.LoadingMore>
              <Loader className="spinner" size={30} />
              <span>Loading more apartments...</span>
            </S.LoadingMore>
          )}
        </>
      )}
    </>
  );
}

export default ApartmentCard;
