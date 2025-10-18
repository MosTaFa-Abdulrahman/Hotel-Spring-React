import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../requestMethod";

export const hotelSlice = createApi({
  reducerPath: "hotelsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "hotels" }),
  tagTypes: ["Hotel"],
  endpoints: (builder) => ({
    // Get all hotels with infinite scroll support
    getHotels: builder.query({
      query: ({ page = 1, size = 10 } = {}) => ({
        url: `?page=${page}&size=${size}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        // Transform API response to match our expected format
        return {
          content: response.data.content || [],
          hasMore: response.data.hasNext || false,
          currentPage: response.data.currentPage || 1,
          totalPages: response.data.totalPages || 1,
          totalItems: response.data.totalItems || 0,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        return {
          ...newItems,
          content: [...currentCache.content, ...newItems.content],
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ["Hotel"],
    }),

    // Search hotels with filters
    searchHotels: builder.query({
      query: ({
        name,
        city,
        country,
        phoneNumber,
        isActive,
        page = 1,
        size = 10,
        sortBy = "rating",
        direction = "DESC",
      } = {}) => {
        // Build query parameters
        const params = new URLSearchParams();

        if (name) params.append("name", name);
        if (city) params.append("city", city);
        if (country) params.append("country", country);
        if (phoneNumber) params.append("phoneNumber", phoneNumber);
        if (isActive !== undefined && isActive !== null && isActive !== "") {
          params.append("isActive", isActive);
        }

        params.append("page", page);
        params.append("size", size);
        params.append("sortBy", sortBy);
        params.append("direction", direction);

        return {
          url: `/search?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          content: response.data.content || [],
          currentPage: response.data.currentPage || 1,
          totalPages: response.data.totalPages || 1,
          totalItems: response.data.totalItems || 0,
          hasNext: response.data.hasNext || false,
          hasPrevious: response.data.hasPrevious || false,
          nextPageUrl: response.data.nextPageUrl || null,
          previousPageUrl: response.data.previousPageUrl || null,
        };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: "Hotel", id })),
              { type: "Hotel", id: "LIST" },
            ]
          : [{ type: "Hotel", id: "LIST" }],
    }),

    // Get single hotel
    getHotel: builder.query({
      query: (hotelId) => ({
        url: `/${hotelId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      providesTags: (result, error, hotelId) => [
        { type: "Hotel", id: hotelId },
      ],
    }),

    // Create hotel
    createHotel: builder.mutation({
      query: (hotelData) => ({
        url: "",
        method: "POST",
        data: hotelData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: ["Hotel"],
    }),

    // Update hotel
    updateHotel: builder.mutation({
      query: ({ hotelId, ...hotelData }) => ({
        url: `/${hotelId}`,
        method: "PUT",
        data: hotelData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: (result, error, { hotelId }) => [
        { type: "Hotel", id: hotelId },
        "Hotel",
      ],
    }),

    // Delete hotel
    deleteHotel: builder.mutation({
      query: (hotelId) => ({
        url: `/${hotelId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: (result, error, hotelId) => [
        { type: "Hotel", id: hotelId },
        "Hotel",
      ],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useSearchHotelsQuery,
  useGetHotelQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelSlice;
