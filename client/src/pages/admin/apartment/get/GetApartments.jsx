import * as S from "./getApartments.style";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Search, Filter, Home } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

// RTKQ
import {
  useGetApartmentsQuery,
  useDeleteApartmentMutation,
} from "../../../../store/apartment/apartmentSlice";
import toast from "react-hot-toast";

function GetApartments() {
  // Search filters state
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
    isAvailable: "",
    roomsBookableSeparately: "",
    hasKitchen: "",
    hasLivingRoom: "",
    hasDiningArea: "",
    hasBalcony: "",
    hasWifi: "",
    hasAirConditioning: "",
    hasParking: "",
    hasLaundry: "",
    page: 1,
    size: 10,
    sortBy: "pricePerNight",
    direction: "ASC",
  });

  // Debounced filters for API call
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  // RTKQ
  const { data, isLoading, isFetching, error } =
    useGetApartmentsQuery(debouncedFilters);
  const [deleteApartment, { isLoading: isDeleting }] =
    useDeleteApartmentMutation();

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  // Handle pagination model change (MUI v6+)
  const handlePaginationModelChange = (paginationModel) => {
    setFilters((prev) => ({
      ...prev,
      page: paginationModel.page + 1, // MUI DataGrid uses 0-based index
      size: paginationModel.pageSize,
    }));
  };

  // Handle delete with confirmation
  const handleDelete = useCallback(
    async (id, apartmentName) => {
      if (
        window.confirm(
          `Are you sure you want to delete apartment "${apartmentName}"?`
        )
      ) {
        try {
          await deleteApartment(id).unwrap();
          toast.success("Apartment deleted successfully!");
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete apartment");
          console.error("Delete error:", error);
        }
      }
    },
    [deleteApartment]
  );

  // Handle sort
  const handleSortModelChange = (sortModel) => {
    if (sortModel.length > 0) {
      setFilters((prev) => ({
        ...prev,
        sortBy: sortModel[0].field,
        direction: sortModel[0].sort.toUpperCase(),
        page: 1, // Reset to first page on sort change
      }));
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
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
      isAvailable: "",
      roomsBookableSeparately: "",
      hasKitchen: "",
      hasLivingRoom: "",
      hasDiningArea: "",
      hasBalcony: "",
      hasWifi: "",
      hasAirConditioning: "",
      hasParking: "",
      hasLaundry: "",
      page: 1,
      size: 10,
      sortBy: "pricePerNight",
      direction: "ASC",
    });
  };

  // DataGrid columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      sortable: true,
    },
    {
      field: "apartmentNumber",
      headerName: "Apt #",
      width: 100,
      sortable: true,
    },
    {
      field: "name",
      headerName: "Apartment Name",
      flex: 1,
      minWidth: 100,
      sortable: true,
    },
    {
      field: "apartmentType",
      headerName: "Type",
      width: 170,
      sortable: true,
      renderCell: (params) => (
        <S.TypeBadge>{params.value || "N/A"}</S.TypeBadge>
      ),
    },
    {
      field: "pricePerNight",
      headerName: "Price/Night",
      width: 140,
      sortable: true,
      renderCell: (params) => <S.PriceBadge>${params.value}</S.PriceBadge>,
    },
    {
      field: "totalCapacity",
      headerName: "Capacity",
      width: 100,
      sortable: true,
      renderCell: (params) => `${params.value} guests`,
    },
    {
      field: "numberOfBedrooms",
      headerName: "Bedrooms",
      width: 100,
      sortable: true,
    },
    {
      field: "numberOfBathrooms",
      headerName: "Bathrooms",
      width: 110,
      sortable: true,
    },
    {
      field: "floorNumber",
      headerName: "Floor",
      width: 80,
      sortable: true,
    },
    {
      field: "areaSqm",
      headerName: "Area (m²)",
      width: 100,
      sortable: true,
    },
    {
      field: "isAvailable",
      headerName: "Status",
      width: 120,
      sortable: true,
      renderCell: (params) => (
        <S.StatusBadge $isAvailable={params.value}>
          {params.value ? "Available" : "Unavailable"}
        </S.StatusBadge>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <S.ActionButton
          onClick={() => handleDelete(params.row.id, params.row.name)}
          disabled={isDeleting}
          title="Delete Apartment"
        >
          <Trash2 size={18} />
        </S.ActionButton>
      ),
    },
  ];

  // Show error
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch apartments");
    }
  }, [error]);

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <Home size={32} />
          <div>
            <S.Title>Apartment Management</S.Title>
            <S.Subtitle>Search and manage all apartments</S.Subtitle>
          </div>
        </S.TitleWrapper>
      </S.Header>

      <S.FiltersCard>
        <S.FiltersHeader>
          <S.FiltersTitle>
            <Filter size={20} />
            Search Filters
          </S.FiltersTitle>
          <S.ClearButton onClick={handleClearFilters}>Clear All</S.ClearButton>
        </S.FiltersHeader>

        <S.FiltersGrid>
          <S.InputGroup>
            <S.Label>Apartment Number</S.Label>
            <S.InputWrapper>
              <Search size={18} />
              <S.Input
                type="text"
                placeholder="Search by number..."
                value={filters.apartmentNumber}
                onChange={(e) =>
                  handleFilterChange("apartmentNumber", e.target.value)
                }
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Apartment Name</S.Label>
            <S.InputWrapper>
              <Search size={18} />
              <S.Input
                type="text"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Type</S.Label>
            <S.Select
              value={filters.apartmentType}
              onChange={(e) =>
                handleFilterChange("apartmentType", e.target.value)
              }
            >
              <option value="">All Types</option>
              <option value="STUDIO">Studio</option>
              <option value="ONE_BEDROOM">One Bedroom</option>
              <option value="TWO_BEDROOM">Two Bedroom</option>
              <option value="THREE_BEDROOM">Three Bedroom</option>
              <option value="PENTHOUSE">Penthouse</option>
              <option value="FAMILY_APARTMENT">Family</option>
              <option value="LUXURY_SUITE">Luxury</option>
              <option value="PRESIDENTIAL_SUITE">Presidential</option>
            </S.Select>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Min Price</S.Label>
            <S.Input
              type="number"
              placeholder="Min price..."
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Max Price</S.Label>
            <S.Input
              type="number"
              placeholder="Max price..."
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Min Capacity</S.Label>
            <S.Input
              type="number"
              placeholder="Min capacity..."
              value={filters.minCapacity}
              onChange={(e) =>
                handleFilterChange("minCapacity", e.target.value)
              }
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Max Capacity</S.Label>
            <S.Input
              type="number"
              placeholder="Max capacity..."
              value={filters.maxCapacity}
              onChange={(e) =>
                handleFilterChange("maxCapacity", e.target.value)
              }
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Bedrooms</S.Label>
            <S.Select
              value={filters.minBedrooms}
              onChange={(e) =>
                handleFilterChange("minBedrooms", e.target.value)
              }
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </S.Select>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Bathrooms</S.Label>
            <S.Select
              value={filters.minBathrooms}
              onChange={(e) =>
                handleFilterChange("minBathrooms", e.target.value)
              }
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </S.Select>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Floor Number</S.Label>
            <S.Input
              type="number"
              placeholder="Floor number..."
              value={filters.floorNumber}
              onChange={(e) =>
                handleFilterChange("floorNumber", e.target.value)
              }
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Availability</S.Label>
            <S.Select
              value={filters.isAvailable}
              onChange={(e) =>
                handleFilterChange("isAvailable", e.target.value)
              }
            >
              <option value="">All Status</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </S.Select>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Sort By</S.Label>
            <S.Select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="pricePerNight">Price Per Night</option>
              <option value="name">Name</option>
              <option value="apartmentNumber">Apartment Number</option>
              <option value="totalCapacity">Capacity</option>
              <option value="numberOfBedrooms">Bedrooms</option>
              <option value="areaSqm">Area</option>
            </S.Select>
          </S.InputGroup>
        </S.FiltersGrid>

        <S.AmenitiesSection>
          <S.AmenitiesTitle>Amenities Filters</S.AmenitiesTitle>
          <S.AmenitiesGrid>
            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasKitchen"
                checked={filters.hasKitchen === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasKitchen",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasKitchen">Kitchen</S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasLivingRoom"
                checked={filters.hasLivingRoom === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasLivingRoom",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasLivingRoom">
                Living Room
              </S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasDiningArea"
                checked={filters.hasDiningArea === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasDiningArea",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasDiningArea">
                Dining Area
              </S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasBalcony"
                checked={filters.hasBalcony === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasBalcony",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasBalcony">Balcony</S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasWifi"
                checked={filters.hasWifi === "true"}
                onChange={(e) =>
                  handleFilterChange("hasWifi", e.target.checked ? "true" : "")
                }
              />
              <S.CheckboxLabel htmlFor="hasWifi">WiFi</S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasAirConditioning"
                checked={filters.hasAirConditioning === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasAirConditioning",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasAirConditioning">
                Air Conditioning
              </S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasParking"
                checked={filters.hasParking === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasParking",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasParking">Parking</S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasLaundry"
                checked={filters.hasLaundry === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasLaundry",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasLaundry">Laundry</S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="roomsBookableSeparately"
                checked={filters.roomsBookableSeparately === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "roomsBookableSeparately",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="roomsBookableSeparately">
                Rooms Bookable Separately
              </S.CheckboxLabel>
            </S.CheckboxGroup>
          </S.AmenitiesGrid>
        </S.AmenitiesSection>
      </S.FiltersCard>

      <S.TableCard>
        <S.ResultsInfo>
          {data?.data?.totalItems > 0 ? (
            <>
              Showing <strong>{(filters.page - 1) * filters.size + 1}</strong>{" "}
              to{" "}
              <strong>
                {Math.min(filters.page * filters.size, data?.data?.totalItems)}
              </strong>{" "}
              of <strong>{data?.data?.totalItems}</strong> apartments
            </>
          ) : (
            "No apartments found"
          )}
        </S.ResultsInfo>

        <Paper elevation={0} sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={data?.data?.content || []}
            columns={columns}
            loading={isLoading || isFetching}
            paginationMode="server"
            paginationModel={{
              page: filters.page - 1,
              pageSize: filters.size,
            }}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[5, 10, 25]}
            rowCount={data?.data?.totalItems || 0}
            disableRowSelectionOnClick
            sortingMode="server"
            onSortModelChange={handleSortModelChange}
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fafafa",
                borderBottom: "2px solid #f093fb",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#fff5f7",
              },
            }}
          />
        </Paper>
      </S.TableCard>
    </S.Container>
  );
}

export default GetApartments;
