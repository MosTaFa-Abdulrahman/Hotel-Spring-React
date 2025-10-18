import * as S from "./getUsers.style";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Trash2, Search, Users, Mail, Phone, User } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

// RTKQ
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../../store/user/userSlice";
import toast from "react-hot-toast";

function GetUsers() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Local search state (client-side filtering)
  const [searchTerm, setSearchTerm] = useState("");

  // RTKQ
  const { data, isLoading, isFetching, error } = useGetUsersQuery({
    page,
    size: pageSize,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Client-side filtering based on search term
  const filteredUsers = useMemo(() => {
    if (!data?.data?.content) return [];

    if (!searchTerm.trim()) {
      return data.data.content;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return data.data.content.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(lowerSearch) ||
        user.firstName?.toLowerCase().includes(lowerSearch) ||
        user.lastName?.toLowerCase().includes(lowerSearch) ||
        user.username?.toLowerCase().includes(lowerSearch) ||
        user.email?.toLowerCase().includes(lowerSearch) ||
        user.phoneNumber?.toLowerCase().includes(lowerSearch) ||
        user.role?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [data?.data?.content, searchTerm]);

  // Handle pagination model change (MUI v6+)
  const handlePaginationModelChange = (paginationModel) => {
    setPage(paginationModel.page + 1);
    setPageSize(paginationModel.pageSize);
  };

  // Handle delete with confirmation
  const handleDelete = useCallback(
    async (id, userName) => {
      if (
        window.confirm(`Are you sure you want to delete user "${userName}"?`)
      ) {
        try {
          await deleteUser(id).unwrap();
          toast.success("User deleted successfully!");
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete user");
          console.error("Delete error:", error);
        }
      }
    },
    [deleteUser]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // DataGrid columns
  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 200,
      sortable: true,
      valueGetter: (params) => {
        const firstName = params?.row?.firstName || "";
        const lastName = params?.row?.lastName || "";
        return `${firstName} ${lastName}`.trim();
      },
      renderCell: (params) => {
        const firstName = params.row.firstName || "";
        const lastName = params.row.lastName || "";
        const fullName = `${firstName} ${lastName}`.trim();
        const initial =
          firstName?.charAt(0)?.toUpperCase() ||
          lastName?.charAt(0)?.toUpperCase() ||
          "U";

        return (
          <S.NameCell>
            {params.row.profileImageUrl ? (
              <S.ProfileImage
                src={params?.row?.profileImageUrl}
                alt={fullName}
              />
            ) : (
              <S.Avatar>{initial}</S.Avatar>
            )}
            <NavLink to={`/users/${params.row.id}`} className="link">
              <S.FullName>{fullName || "N/A"}</S.FullName>
              <S.Username>@{params.row.username}</S.Username>
            </NavLink>
          </S.NameCell>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      sortable: true,
      renderCell: (params) => (
        <S.EmailCell>
          <Mail size={14} />
          <span>{params.value}</span>
        </S.EmailCell>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <S.PhoneCell>
          <Phone size={14} />
          <span>{params.value || "N/A"}</span>
        </S.PhoneCell>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 130,
      sortable: true,
      renderCell: (params) => (
        <S.RoleBadge $role={params.value}>{params.value || "USER"}</S.RoleBadge>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const fullName =
          `${params?.row?.firstName} ${params?.row?.lastName}`.trim();
        return (
          <>
            {params?.row?.role === "USER" && (
              <S.ActionButton
                onClick={() => handleDelete(params.row.id, fullName)}
                disabled={isDeleting}
                title="Delete User"
              >
                <Trash2 size={18} />
              </S.ActionButton>
            )}
          </>
        );
      },
    },
  ];

  // Show error
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch users");
    }
  }, [error]);

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <Users size={32} />
          <div>
            <S.Title>User Management</S.Title>
            <S.Subtitle>Manage and view all registered users</S.Subtitle>
          </div>
        </S.TitleWrapper>
      </S.Header>

      <S.SearchCard>
        <S.SearchWrapper>
          <Search size={20} />
          <S.SearchInput
            type="text"
            placeholder="Search users by name, username, email, phone, or role..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <S.ClearButton onClick={handleClearSearch}>Clear</S.ClearButton>
          )}
        </S.SearchWrapper>
        {searchTerm && (
          <S.SearchInfo>
            Found <strong>{filteredUsers.length}</strong> user(s) matching "
            {searchTerm}"
          </S.SearchInfo>
        )}
      </S.SearchCard>

      <S.TableCard>
        <S.ResultsInfo>
          {data?.data?.totalItems > 0 ? (
            <>
              Showing <strong>{(page - 1) * pageSize + 1}</strong> to{" "}
              <strong>
                {Math.min(page * pageSize, data?.data?.totalItems)}
              </strong>{" "}
              of <strong>{data?.data?.totalItems}</strong> users
              {searchTerm && (
                <span>
                  {" "}
                  (filtered to <strong>{filteredUsers.length}</strong>)
                </span>
              )}
            </>
          ) : (
            "No users found"
          )}
        </S.ResultsInfo>

        <Paper elevation={0} sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            loading={isLoading || isFetching}
            paginationMode="server"
            paginationModel={{
              page: page - 1,
              pageSize: pageSize,
            }}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[5, 10, 25, 50]}
            rowCount={data?.data?.totalItems || 0}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fafafa",
                borderBottom: "2px solid #667eea",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f0f4ff",
              },
            }}
          />
        </Paper>
      </S.TableCard>
    </S.Container>
  );
}

export default GetUsers;
