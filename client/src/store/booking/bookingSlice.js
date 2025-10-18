import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../requestMethod";

export const bookingSlice = createApi({
  reducerPath: "bookingsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/bookings" }),
  tagTypes: ["Booking"],

  endpoints: (builder) => ({
    // Create Booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "",
        method: "POST",
        data: bookingData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: ["Booking"],
    }),

    // Cancel booking
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/${bookingId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: ["Booking"],
    }),

    // Get all bookings for ((CurrentUser))
    getBookingsForCurrentUser: builder.query({
      query: ({ page = 1, size = 10 } = {}) => ({
        url: `?page=${page}&size=${size}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        // Return the full response structure to access pagination info and content
        return {
          data: response.data,
          status: response.status,
          errors: response.errors,
        };
      },
      providesTags: ["Booking"],
    }),

    // Get all bookings for ((User))
    getBookingsForUser: builder.query({
      query: ({ userId, page = 1, size = 10 } = {}) => ({
        url: `/user/${userId}?${page}&size=${size}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        // Return the full response structure to access pagination info and content
        return {
          data: response.data,
          status: response.status,
          errors: response.errors,
        };
      },
      providesTags: ["Booking"],
    }),

    //  Get All For ((Specific-Apartment))
    getBookingsForApartment: builder.query({
      query: (apartmentId) => ({
        url: `/apartment/${apartmentId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        // Return the full response structure to access pagination info and content
        return {
          data: response.data,
          status: response.status,
          errors: response.errors,
        };
      },
      providesTags: ["Booking"],
    }),

    //  Get All For ((Specific-Room))
    getBookingsForRoom: builder.query({
      query: (roomId) => ({
        url: `/room/${roomId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        // Return the full response structure to access pagination info and content
        return {
          data: response.data,
          status: response.status,
          errors: response.errors,
        };
      },
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCancelBookingMutation,
  useGetBookingsForCurrentUserQuery,
  useGetBookingsForUserQuery,
  useGetBookingsForApartmentQuery,
  useGetBookingsForRoomQuery,
} = bookingSlice;
