import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../requestMethod";

export const roomSlice = createApi({
  reducerPath: "roomsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/rooms" }),
  tagTypes: ["room"],
  endpoints: (builder) => ({
    // Get single room
    getRoom: builder.query({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      providesTags: (result, error, roomId) => [{ type: "Room", id: roomId }],
    }),

    // Get All Normal
    getAllRooms: builder.query({
      query: ({
        roomNumber,
        roomType,
        minPrice,
        maxPrice,
        minCapacity,
        maxCapacity,
        isAvailable,
        hasWifi,
        hasAirConditioning,
        hasTv,
        hasMiniBar,
        hasBalcony,
        hasPrivateBathroom,
        page = 1,
        size = 10,
        sortBy = "pricePerNight",
        direction = "ASC",
      }) => {
        const params = new URLSearchParams();

        if (roomNumber) params.append("roomNumber", roomNumber);
        if (roomType) params.append("roomType", roomType);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (minCapacity) params.append("minCapacity", minCapacity);
        if (maxCapacity) params.append("maxCapacity", maxCapacity);
        if (isAvailable !== undefined && isAvailable !== null)
          params.append("isAvailable", isAvailable);
        if (hasWifi !== undefined && hasWifi !== null)
          params.append("hasWifi", hasWifi);
        if (hasAirConditioning !== undefined && hasAirConditioning !== null)
          params.append("hasAirConditioning", hasAirConditioning);
        if (hasTv !== undefined && hasTv !== null)
          params.append("hasTv", hasTv);
        if (hasMiniBar !== undefined && hasMiniBar !== null)
          params.append("hasMiniBar", hasMiniBar);
        if (hasBalcony !== undefined && hasBalcony !== null)
          params.append("hasBalcony", hasBalcony);
        if (hasPrivateBathroom !== undefined && hasPrivateBathroom !== null)
          params.append("hasPrivateBathroom", hasPrivateBathroom);

        params.append("page", page);
        params.append("size", size);
        params.append("sortBy", sortBy);
        params.append("direction", direction);

        return {
          url: `?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          status: response.status,
          errors: response.errors,
        };
      },
      providesTags: (result, error, arg) => [
        { type: "Room", id: `APARTMENT-${arg.apartmentId}` },
      ],
    }),

    /* Get All For ((Specific-Apartment))
     * with ((Advanced Search 🤞))
     */
    getRoomsForApartment: builder.query({
      query: ({
        apartmentId,
        roomNumber,
        roomType,
        minPrice,
        maxPrice,
        minCapacity,
        maxCapacity,
        isAvailable,
        hasWifi,
        hasAirConditioning,
        hasTv,
        hasMiniBar,
        hasBalcony,
        hasPrivateBathroom,
        page = 1,
        size = 10,
        sortBy = "pricePerNight",
        direction = "ASC",
      }) => {
        const params = new URLSearchParams();

        if (roomNumber) params.append("roomNumber", roomNumber);
        if (roomType) params.append("roomType", roomType);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (minCapacity) params.append("minCapacity", minCapacity);
        if (maxCapacity) params.append("maxCapacity", maxCapacity);
        if (isAvailable !== undefined && isAvailable !== null)
          params.append("isAvailable", isAvailable);
        if (hasWifi !== undefined && hasWifi !== null)
          params.append("hasWifi", hasWifi);
        if (hasAirConditioning !== undefined && hasAirConditioning !== null)
          params.append("hasAirConditioning", hasAirConditioning);
        if (hasTv !== undefined && hasTv !== null)
          params.append("hasTv", hasTv);
        if (hasMiniBar !== undefined && hasMiniBar !== null)
          params.append("hasMiniBar", hasMiniBar);
        if (hasBalcony !== undefined && hasBalcony !== null)
          params.append("hasBalcony", hasBalcony);
        if (hasPrivateBathroom !== undefined && hasPrivateBathroom !== null)
          params.append("hasPrivateBathroom", hasPrivateBathroom);

        params.append("page", page);
        params.append("size", size);
        params.append("sortBy", sortBy);
        params.append("direction", direction);

        return {
          url: `/apartment/${apartmentId}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          status: response.status,
          errors: response.errors,
        };
      },
      providesTags: (result, error, arg) => [
        { type: "Room", id: `APARTMENT-${arg.apartmentId}` },
      ],
    }),

    /* Get All Standalone Rooms for ((Specific-Hotel)) - Not belonging to any apartment
     * with ((Advanced Search 🤞))
     */
    getStandaloneRoomsForHotel: builder.query({
      query: ({
        hotelId,
        roomNumber,
        roomType,
        minPrice,
        maxPrice,
        minCapacity,
        maxCapacity,
        isAvailable,
        hasWifi,
        hasAirConditioning,
        hasTv,
        hasMiniBar,
        hasBalcony,
        hasPrivateBathroom,
        page = 1,
        size = 10,
        sortBy = "pricePerNight",
        direction = "ASC",
      }) => {
        // Build query params dynamically
        const params = new URLSearchParams();

        if (roomNumber) params.append("roomNumber", roomNumber);
        if (roomType) params.append("roomType", roomType);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (minCapacity) params.append("minCapacity", minCapacity);
        if (maxCapacity) params.append("maxCapacity", maxCapacity);
        if (isAvailable !== undefined && isAvailable !== null)
          params.append("isAvailable", isAvailable);
        if (hasWifi !== undefined && hasWifi !== null)
          params.append("hasWifi", hasWifi);
        if (hasAirConditioning !== undefined && hasAirConditioning !== null)
          params.append("hasAirConditioning", hasAirConditioning);
        if (hasTv !== undefined && hasTv !== null)
          params.append("hasTv", hasTv);
        if (hasMiniBar !== undefined && hasMiniBar !== null)
          params.append("hasMiniBar", hasMiniBar);
        if (hasBalcony !== undefined && hasBalcony !== null)
          params.append("hasBalcony", hasBalcony);
        if (hasPrivateBathroom !== undefined && hasPrivateBathroom !== null)
          params.append("hasPrivateBathroom", hasPrivateBathroom);

        params.append("page", page);
        params.append("size", size);
        params.append("sortBy", sortBy);
        params.append("direction", direction);

        return {
          url: `/hotel/${hotelId}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          status: response.status,
          errors: response.errors,
        };
      },
      // 🔥 FIX #1: Serialize query args to treat each page as separate cache entry
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page, ...otherArgs } = queryArgs;
        // Cache based on everything EXCEPT page number
        return `${endpointName}(${JSON.stringify(otherArgs)})`;
      },
      // 🔥 FIX #2: Merge incoming pages into existing cache
      merge: (currentCache, newItems) => {
        if (currentCache && currentCache.data && currentCache.data.content) {
          // Merge new content with existing
          currentCache.data.content.push(...newItems.data.content);
          currentCache.data.hasNext = newItems.data.hasNext;
          currentCache.data.currentPage = newItems.data.currentPage;
        } else {
          return newItems;
        }
      },
      // 🔥 FIX #3: Force refetch for new pages
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ["Room"],
    }),

    // Create room
    createRoom: builder.mutation({
      query: (roomData) => ({
        url: "",
        method: "POST",
        data: roomData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: ["Room"],
    }),

    // Update room
    updateRoom: builder.mutation({
      query: ({ roomId, ...roomData }) => ({
        url: `/${roomId}`,
        method: "PUT",
        data: roomData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: (result, error, { roomId }) => [
        { type: "Room", id: roomId },
        "Room",
      ],
    }),

    // Delete room
    deleteRoom: builder.mutation({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: (result, error, roomId) => [
        { type: "Room", id: roomId },
        "Room",
      ],
    }),
  }),
});

export const {
  useGetRoomQuery,
  useGetAllRoomsQuery,
  useGetRoomsForApartmentQuery,
  useGetStandaloneRoomsForHotelQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomSlice;
