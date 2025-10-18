import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../requestMethod";

export const apartmentSlice = createApi({
  reducerPath: "apartmentsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/apartments" }),
  tagTypes: ["Apartment"],
  endpoints: (builder) => ({
    // Get single apartment
    getApartment: builder.query({
      query: (apartmentId) => ({
        url: `/${apartmentId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      providesTags: (result, error, apartmentId) => [
        { type: "Apartment", id: apartmentId },
      ],
    }),

    // Get all Apartments with pagination (for infinite scroll)
    getApartments: builder.query({
      query: ({
        apartmentNumber,
        name,
        apartmentType,
        minPrice,
        maxPrice,
        minCapacity,
        maxCapacity,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        floorNumber,
        minArea,
        maxArea,
        isAvailable,
        roomsBookableSeparately,
        hasKitchen,
        hasLivingRoom,
        hasDiningArea,
        hasBalcony,
        hasWifi,
        hasAirConditioning,
        hasParking,
        hasLaundry,
        page = 1,
        size = 10,
        sortBy = "pricePerNight",
        direction = "ASC",
      } = {}) => {
        // Build query params dynamically
        const params = new URLSearchParams();

        if (apartmentNumber) params.append("apartmentNumber", apartmentNumber);
        if (name) params.append("name", name);
        if (apartmentType) params.append("apartmentType", apartmentType);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (minCapacity) params.append("minCapacity", minCapacity);
        if (maxCapacity) params.append("maxCapacity", maxCapacity);
        if (minBedrooms) params.append("minBedrooms", minBedrooms);
        if (maxBedrooms) params.append("maxBedrooms", maxBedrooms);
        if (minBathrooms) params.append("minBathrooms", minBathrooms);
        if (maxBathrooms) params.append("maxBathrooms", maxBathrooms);
        if (floorNumber) params.append("floorNumber", floorNumber);
        if (minArea) params.append("minArea", minArea);
        if (maxArea) params.append("maxArea", maxArea);

        // Handle boolean filters - check for empty string too
        if (
          isAvailable !== undefined &&
          isAvailable !== null &&
          isAvailable !== ""
        )
          params.append("isAvailable", isAvailable);
        if (
          roomsBookableSeparately !== undefined &&
          roomsBookableSeparately !== null &&
          roomsBookableSeparately !== ""
        )
          params.append("roomsBookableSeparately", roomsBookableSeparately);
        if (
          hasKitchen !== undefined &&
          hasKitchen !== null &&
          hasKitchen !== ""
        )
          params.append("hasKitchen", hasKitchen);
        if (
          hasLivingRoom !== undefined &&
          hasLivingRoom !== null &&
          hasLivingRoom !== ""
        )
          params.append("hasLivingRoom", hasLivingRoom);
        if (
          hasDiningArea !== undefined &&
          hasDiningArea !== null &&
          hasDiningArea !== ""
        )
          params.append("hasDiningArea", hasDiningArea);
        if (
          hasBalcony !== undefined &&
          hasBalcony !== null &&
          hasBalcony !== ""
        )
          params.append("hasBalcony", hasBalcony);
        if (hasWifi !== undefined && hasWifi !== null && hasWifi !== "")
          params.append("hasWifi", hasWifi);
        if (
          hasAirConditioning !== undefined &&
          hasAirConditioning !== null &&
          hasAirConditioning !== ""
        )
          params.append("hasAirConditioning", hasAirConditioning);
        if (
          hasParking !== undefined &&
          hasParking !== null &&
          hasParking !== ""
        )
          params.append("hasParking", hasParking);
        if (
          hasLaundry !== undefined &&
          hasLaundry !== null &&
          hasLaundry !== ""
        )
          params.append("hasLaundry", hasLaundry);

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
      // Proper cache tagging for invalidation
      providesTags: (result, error, arg) =>
        result?.data?.content
          ? [
              ...result.data.content.map(({ id }) => ({
                type: "Apartment",
                id,
              })),
              { type: "Apartment", id: "LIST" },
            ]
          : [{ type: "Apartment", id: "LIST" }],
    }),

    // Get All Apartments for ((Specific-Hotel)) with ((Advanced Search 🤞))
    getApartmentsForHotel: builder.query({
      query: ({
        hotelId,
        apartmentNumber,
        name,
        apartmentType,
        minPrice,
        maxPrice,
        minCapacity,
        maxCapacity,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        floorNumber,
        minArea,
        maxArea,
        isAvailable,
        roomsBookableSeparately,
        hasKitchen,
        hasLivingRoom,
        hasDiningArea,
        hasBalcony,
        hasWifi,
        hasAirConditioning,
        hasParking,
        hasLaundry,
        page = 1,
        size = 10,
        sortBy = "pricePerNight",
        direction = "ASC",
      }) => {
        // Build query params dynamically
        const params = new URLSearchParams();

        if (apartmentNumber) params.append("apartmentNumber", apartmentNumber);
        if (name) params.append("name", name);
        if (apartmentType) params.append("apartmentType", apartmentType);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (minCapacity) params.append("minCapacity", minCapacity);
        if (maxCapacity) params.append("maxCapacity", maxCapacity);
        if (minBedrooms) params.append("minBedrooms", minBedrooms);
        if (maxBedrooms) params.append("maxBedrooms", maxBedrooms);
        if (minBathrooms) params.append("minBathrooms", minBathrooms);
        if (maxBathrooms) params.append("maxBathrooms", maxBathrooms);
        if (floorNumber) params.append("floorNumber", floorNumber);
        if (minArea) params.append("minArea", minArea);
        if (maxArea) params.append("maxArea", maxArea);
        if (isAvailable !== undefined && isAvailable !== null)
          params.append("isAvailable", isAvailable);
        if (
          roomsBookableSeparately !== undefined &&
          roomsBookableSeparately !== null
        )
          params.append("roomsBookableSeparately", roomsBookableSeparately);
        if (hasKitchen !== undefined && hasKitchen !== null)
          params.append("hasKitchen", hasKitchen);
        if (hasLivingRoom !== undefined && hasLivingRoom !== null)
          params.append("hasLivingRoom", hasLivingRoom);
        if (hasDiningArea !== undefined && hasDiningArea !== null)
          params.append("hasDiningArea", hasDiningArea);
        if (hasBalcony !== undefined && hasBalcony !== null)
          params.append("hasBalcony", hasBalcony);
        if (hasWifi !== undefined && hasWifi !== null)
          params.append("hasWifi", hasWifi);
        if (hasAirConditioning !== undefined && hasAirConditioning !== null)
          params.append("hasAirConditioning", hasAirConditioning);
        if (hasParking !== undefined && hasParking !== null)
          params.append("hasParking", hasParking);
        if (hasLaundry !== undefined && hasLaundry !== null)
          params.append("hasLaundry", hasLaundry);

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
      providesTags: ["Apartment"],
    }),

    // Create apartment
    createApartment: builder.mutation({
      query: (apartmentData) => ({
        url: "",
        method: "POST",
        data: apartmentData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: ["Apartment"],
    }),

    // Update apartment
    updateApartment: builder.mutation({
      query: ({ apartmentId, ...apartmentData }) => ({
        url: `/${apartmentId}`,
        method: "PUT",
        data: apartmentData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: (result, error, { apartmentId }) => [
        { type: "Apartment", id: apartmentId },
        "Apartment",
      ],
    }),

    // Delete apartment
    deleteApartment: builder.mutation({
      query: (apartmentId) => ({
        url: `/${apartmentId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: (result, error, apartmentId) => [
        { type: "Apartment", id: apartmentId },
        "Apartment",
      ],
    }),
  }),
});

export const {
  useGetApartmentQuery,
  useGetApartmentsQuery,
  useGetApartmentsForHotelQuery,
  useCreateApartmentMutation,
  useUpdateApartmentMutation,
  useDeleteApartmentMutation,
} = apartmentSlice;
