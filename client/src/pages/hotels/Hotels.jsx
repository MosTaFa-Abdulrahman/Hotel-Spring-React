import * as H from "./hotels.style";
import { useState, useEffect } from "react";
import {
  Star,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// RTKQ
import { useSearchHotelsQuery } from "../../store/hotel/hotelSlice";

function Hotels() {
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    country: "",
    phoneNumber: "",
    isActive: "",
    sortBy: "rating",
    direction: "DESC",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
      setPage(1); // Reset to page 1 when filters change
    }, 600);

    return () => clearTimeout(timer);
  }, [filters]);

  // Fetch hotels with filters
  const { data, isLoading, isFetching, isError } = useSearchHotelsQuery({
    ...debouncedFilters,
    page,
    size: 6,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      city: "",
      country: "",
      phoneNumber: "",
      isActive: "",
      sortBy: "rating",
      direction: "DESC",
    });
  };

  const handleNextPage = () => {
    if (data?.hasNext) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (data?.hasPrevious) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const hotels = data?.content || [];
  const showNoResults = !isLoading && hotels.length === 0;

  return (
    <H.Container>
      <H.Header>
        <H.Title>Discover Amazing Hotels</H.Title>
        <H.Subtitle>
          Find your perfect stay from {data?.totalItems || 0} incredible hotels
        </H.Subtitle>
      </H.Header>

      <H.SearchSection>
        <H.SearchBar>
          <Search size={20} />
          <H.SearchInput
            type="text"
            placeholder="Search hotels by name..."
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
        </H.SearchBar>

        <H.FilterButton onClick={() => setShowFilters(!showFilters)}>
          <Filter size={18} />
          Filters
        </H.FilterButton>
      </H.SearchSection>

      {showFilters && (
        <H.FiltersPanel>
          <H.FilterGrid>
            <H.FilterGroup>
              <H.FilterLabel>City</H.FilterLabel>
              <H.FilterInput
                type="text"
                placeholder="Enter city..."
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
              />
            </H.FilterGroup>

            <H.FilterGroup>
              <H.FilterLabel>Country</H.FilterLabel>
              <H.FilterInput
                type="text"
                placeholder="Enter country..."
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
              />
            </H.FilterGroup>

            <H.FilterGroup>
              <H.FilterLabel>Phone Number</H.FilterLabel>
              <H.FilterInput
                type="text"
                placeholder="Enter phone..."
                value={filters.phoneNumber}
                onChange={(e) =>
                  handleFilterChange("phoneNumber", e.target.value)
                }
              />
            </H.FilterGroup>

            <H.FilterGroup>
              <H.FilterLabel>Status</H.FilterLabel>
              <H.FilterSelect
                value={filters.isActive}
                onChange={(e) => handleFilterChange("isActive", e.target.value)}
              >
                <option value="">All Hotels</option>
                <option value="true">Active Only</option>
                <option value="false">Inactive Only</option>
              </H.FilterSelect>
            </H.FilterGroup>

            <H.FilterGroup>
              <H.FilterLabel>Sort By</H.FilterLabel>
              <H.FilterSelect
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="name">Name</option>
                <option value="city">City</option>
              </H.FilterSelect>
            </H.FilterGroup>

            <H.FilterGroup>
              <H.FilterLabel>Order</H.FilterLabel>
              <H.FilterSelect
                value={filters.direction}
                onChange={(e) =>
                  handleFilterChange("direction", e.target.value)
                }
              >
                <option value="DESC">Descending</option>
                <option value="ASC">Ascending</option>
              </H.FilterSelect>
            </H.FilterGroup>
          </H.FilterGrid>

          <H.ClearButton onClick={clearFilters}>
            Clear All Filters
          </H.ClearButton>
        </H.FiltersPanel>
      )}

      {isLoading ? (
        <H.LoadingContainer>
          <Loader size={50} />
          <p>Loading hotels...</p>
        </H.LoadingContainer>
      ) : showNoResults ? (
        <H.NoResults>
          <h3>No hotels found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </H.NoResults>
      ) : (
        <>
          <H.HotelsGrid>
            {hotels.map((hotel) => (
              <H.HotelCard key={hotel.id}>
                <H.ImageContainer>
                  <H.HotelImage src={hotel.imageUrl} alt={hotel.name} />
                  <H.StatusBadge isActive={hotel.isActive}>
                    {hotel.isActive ? "Active" : "Inactive"}
                  </H.StatusBadge>
                  {hotel.rating && (
                    <H.RatingBadge>
                      <Star size={14} fill="#ffc107" color="#ffc107" />
                      <span>{hotel.rating.toFixed(1)}</span>
                    </H.RatingBadge>
                  )}
                </H.ImageContainer>

                <H.CardContent>
                  <H.HotelName>{hotel.name}</H.HotelName>

                  <H.Location>
                    <MapPin size={16} />
                    <span>
                      {hotel.city}, {hotel.country}
                    </span>
                  </H.Location>

                  <H.Description>{hotel.description}</H.Description>

                  <H.ContactInfo>
                    <H.ContactItem>
                      <Phone size={14} />
                      <span>{hotel.phoneNumber}</span>
                    </H.ContactItem>
                    <H.ContactItem>
                      <Mail size={14} />
                      <span>{hotel.email}</span>
                    </H.ContactItem>
                  </H.ContactInfo>

                  <H.Address>
                    {hotel.address}, {hotel.postalCode}
                  </H.Address>

                  {hotel.isActive && (
                    <NavLink to={`/hotels/${hotel.id}`}>
                      <H.BookButton>See More</H.BookButton>
                    </NavLink>
                  )}
                </H.CardContent>
              </H.HotelCard>
            ))}
          </H.HotelsGrid>

          {/* Pagination Controls */}
          <H.PaginationContainer>
            <H.PaginationInfo>
              Page <strong>{data?.currentPage}</strong> of{" "}
              <strong>{data?.totalPages}</strong> | Showing{" "}
              <strong>{hotels.length}</strong> of{" "}
              <strong>{data?.totalItems}</strong> hotels
            </H.PaginationInfo>

            <H.PaginationButtons>
              <H.PaginationButton
                onClick={handlePreviousPage}
                disabled={!data?.hasPrevious || isFetching}
              >
                <ChevronLeft size={20} />
                Previous
              </H.PaginationButton>

              <H.PageIndicator>
                {data?.currentPage} / {data?.totalPages}
              </H.PageIndicator>

              <H.PaginationButton
                onClick={handleNextPage}
                disabled={!data?.hasNext || isFetching}
              >
                Next
                <ChevronRight size={20} />
              </H.PaginationButton>
            </H.PaginationButtons>
          </H.PaginationContainer>
        </>
      )}

      {isError && (
        <H.ErrorMessage>
          Something went wrong. Please try again later.
        </H.ErrorMessage>
      )}
    </H.Container>
  );
}

export default Hotels;
