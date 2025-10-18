import * as S from "./getRooms.style";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Search, Filter, Bed } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

// RTKQ
import {
  useGetAllRoomsQuery,
  useDeleteRoomMutation,
} from "../../../../store/room/roomSlice";
import toast from "react-hot-toast";

function GetRooms() {
  // Search filters state
  const [filters, setFilters] = useState({
    roomNumber: "",
    roomType: "",
    minPrice: "",
    maxPrice: "",
    minCapacity: "",
    maxCapacity: "",
    isAvailable: "",
    hasWifi: "",
    hasAirConditioning: "",
    hasTv: "",
    hasMiniBar: "",
    hasBalcony: "",
    hasPrivateBathroom: "",
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
    useGetAllRoomsQuery(debouncedFilters);
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

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
    async (id, roomNumber) => {
      if (
        window.confirm(`Are you sure you want to delete room "${roomNumber}"?`)
      ) {
        try {
          await deleteRoom(id).unwrap();
          toast.success("Room deleted successfully!");
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete room");
          console.error("Delete error:", error);
        }
      }
    },
    [deleteRoom]
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
      roomNumber: "",
      roomType: "",
      minPrice: "",
      maxPrice: "",
      minCapacity: "",
      maxCapacity: "",
      isAvailable: "",
      hasWifi: "",
      hasAirConditioning: "",
      hasTv: "",
      hasMiniBar: "",
      hasBalcony: "",
      hasPrivateBathroom: "",
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
      field: "roomNumber",
      headerName: "Room #",
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <S.RoomNumberBadge>{params.value}</S.RoomNumberBadge>
      ),
    },
    {
      field: "roomType",
      headerName: "Room Type",
      flex: 1,
      minWidth: 150,
      sortable: true,
      renderCell: (params) => (
        <S.TypeBadge>{params.value || "N/A"}</S.TypeBadge>
      ),
    },
    {
      field: "pricePerNight",
      headerName: "Price/Night",
      width: 120,
      sortable: true,
      renderCell: (params) => <S.PriceBadge>${params.value}</S.PriceBadge>,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 100,
      sortable: true,
      renderCell: (params) => `${params.value} guests`,
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
      field: "amenities",
      headerName: "Amenities",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <S.AmenitiesContainer>
          {params.row.hasWifi && <S.AmenityTag>📶 WiFi</S.AmenityTag>}
          {params.row.hasAirConditioning && <S.AmenityTag>❄️ AC</S.AmenityTag>}
          {params.row.hasTv && <S.AmenityTag>📺 TV</S.AmenityTag>}
          {params.row.hasMiniBar && <S.AmenityTag>🍹 MiniBar</S.AmenityTag>}
        </S.AmenitiesContainer>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <S.ActionButton
          onClick={() => handleDelete(params.row.id, params.row.roomNumber)}
          disabled={isDeleting}
          title="Delete Room"
        >
          <Trash2 size={18} />
        </S.ActionButton>
      ),
    },
  ];

  // Show error
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch rooms");
    }
  }, [error]);

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <Bed size={32} />
          <div>
            <S.Title>Room Management</S.Title>
            <S.Subtitle>Search and manage all rooms</S.Subtitle>
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
            <S.Label>Room Number</S.Label>
            <S.InputWrapper>
              <Search size={18} />
              <S.Input
                type="text"
                placeholder="Search by number..."
                value={filters.roomNumber}
                onChange={(e) =>
                  handleFilterChange("roomNumber", e.target.value)
                }
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Room Type</S.Label>
            <S.Select
              value={filters.roomType}
              onChange={(e) => handleFilterChange("roomType", e.target.value)}
            >
              <option value="">All Types</option>
              <option value="SINGLE_BEDROOM">Single</option>
              <option value="DOUBLE_BEDROOM">Double</option>
              <option value="BEDROOM">Bedroom</option>
              <option value="MASTER_BEDROOM">Master</option>
              <option value="STANDARD">Standard</option>
              <option value="SUITE">Suite</option>
              <option value="DELUXE">Deluxe</option>
              <option value="PRESIDENTIAL_SUITE">Presidential</option>
              <option value="FAMILY_ROOM">Family</option>
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
              <option value="roomNumber">Room Number</option>
              <option value="roomType">Room Type</option>
              <option value="capacity">Capacity</option>
            </S.Select>
          </S.InputGroup>
        </S.FiltersGrid>

        <S.AmenitiesSection>
          <S.AmenitiesTitle>Amenities Filters</S.AmenitiesTitle>
          <S.AmenitiesGrid>
            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasWifi"
                checked={filters.hasWifi === "true"}
                onChange={(e) =>
                  handleFilterChange("hasWifi", e.target.checked ? "true" : "")
                }
              />
              <S.CheckboxLabel htmlFor="hasWifi">📶 WiFi</S.CheckboxLabel>
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
                ❄️ Air Conditioning
              </S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasTv"
                checked={filters.hasTv === "true"}
                onChange={(e) =>
                  handleFilterChange("hasTv", e.target.checked ? "true" : "")
                }
              />
              <S.CheckboxLabel htmlFor="hasTv">📺 TV</S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasMiniBar"
                checked={filters.hasMiniBar === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasMiniBar",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasMiniBar">
                🍹 Mini Bar
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
              <S.CheckboxLabel htmlFor="hasBalcony">🌅 Balcony</S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.CheckboxGroup>
              <S.Checkbox
                type="checkbox"
                id="hasPrivateBathroom"
                checked={filters.hasPrivateBathroom === "true"}
                onChange={(e) =>
                  handleFilterChange(
                    "hasPrivateBathroom",
                    e.target.checked ? "true" : ""
                  )
                }
              />
              <S.CheckboxLabel htmlFor="hasPrivateBathroom">
                🚿 Private Bathroom
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
              of <strong>{data?.data?.totalItems}</strong> rooms
            </>
          ) : (
            "No rooms found"
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

export default GetRooms;
