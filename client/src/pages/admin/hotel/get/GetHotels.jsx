import * as S from "./getHotels.style";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Search, Filter } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

// RTKQ
import {
  useSearchHotelsQuery,
  useDeleteHotelMutation,
} from "../../../../store/hotel/hotelSlice";
import toast from "react-hot-toast";

function GetHotels() {
  // Search filters state
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    country: "",
    phoneNumber: "",
    isActive: "",
    page: 1,
    size: 10,
    sortBy: "rating",
    direction: "DESC",
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
    useSearchHotelsQuery(debouncedFilters);
  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation();

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
    async (id, hotelName) => {
      if (window.confirm(`Are you sure you want to delete "${hotelName}"?`)) {
        try {
          await deleteHotel(id).unwrap();
          toast.success("Hotel deleted successfully!");
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete hotel");
          console.error("Delete error:", error);
        }
      }
    },
    [deleteHotel]
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
      name: "",
      city: "",
      country: "",
      phoneNumber: "",
      isActive: "",
      page: 1,
      size: 10,
      sortBy: "rating",
      direction: "DESC",
    });
  };

  // DataGrid columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 280,
      sortable: true,
    },
    {
      field: "name",
      headerName: "Hotel Name",
      flex: 1,
      minWidth: 200,
      sortable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      sortable: true,
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      sortable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      sortable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <S.RatingBadge>
          {params.value ? `⭐ ${params.value}` : "N/A"}
        </S.RatingBadge>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      sortable: true,
      renderCell: (params) => (
        <S.StatusBadge $isActive={params.value}>
          {params.value ? "Active" : "Inactive"}
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
          title="Delete Hotel"
        >
          <Trash2 size={18} />
        </S.ActionButton>
      ),
    },
  ];

  // Show error
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch hotels");
    }
  }, [error]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Hotel Management</S.Title>
        <S.Subtitle>Search and manage all hotels</S.Subtitle>
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
            <S.Label>Hotel Name</S.Label>
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
            <S.Label>City</S.Label>
            <S.InputWrapper>
              <Search size={18} />
              <S.Input
                type="text"
                placeholder="Search by city..."
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Country</S.Label>
            <S.InputWrapper>
              <Search size={18} />
              <S.Input
                type="text"
                placeholder="Search by country..."
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Phone Number</S.Label>
            <S.InputWrapper>
              <Search size={18} />
              <S.Input
                type="text"
                placeholder="Search by phone..."
                value={filters.phoneNumber}
                onChange={(e) =>
                  handleFilterChange("phoneNumber", e.target.value)
                }
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Status</S.Label>
            <S.Select
              value={filters.isActive}
              onChange={(e) => handleFilterChange("isActive", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </S.Select>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Sort By</S.Label>
            <S.Select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="country">Country</option>
            </S.Select>
          </S.InputGroup>
        </S.FiltersGrid>
      </S.FiltersCard>

      <S.TableCard>
        <S.ResultsInfo>
          {data?.totalItems > 0 ? (
            <>
              Showing <strong>{(filters.page - 1) * filters.size + 1}</strong>{" "}
              to{" "}
              <strong>
                {Math.min(filters.page * filters.size, data?.totalItems)}
              </strong>{" "}
              of <strong>{data?.totalItems}</strong> hotels
            </>
          ) : (
            "No hotels found"
          )}
        </S.ResultsInfo>

        <Paper elevation={0} sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={data?.content || []}
            columns={columns}
            loading={isLoading || isFetching}
            paginationMode="server"
            paginationModel={{
              page: filters.page - 1,
              pageSize: filters.size,
            }}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[5, 10, 25]}
            rowCount={data?.totalItems || 0}
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

export default GetHotels;
