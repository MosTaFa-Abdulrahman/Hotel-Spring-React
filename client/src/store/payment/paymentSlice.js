import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../requestMethod";

export const paymentSlice = createApi({
  reducerPath: "paymentsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/payments" }),
  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    // Create Payment
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: "",
        method: "POST",
        data: paymentData,
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: ["Payment"],
    }),

    // Pay Shortage
    payShortage: builder.mutation({
      query: ({ paymentId, shortageAmount }) => ({
        url: `/${paymentId}/pay-shortage`,
        method: "PATCH",
        data: { shortageAmount },
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      invalidatesTags: (result, error, { paymentId }) => [
        "Payment",
        { type: "Payment", id: paymentId },
      ],
    }),

    // Get all payments for ((Current-User 🤞))
    getPaymentsForCurrentUser: builder.query({
      query: ({ page = 1, size = 10 } = {}) => ({
        url: `/current-user/?page=${page}&size=${size}`,
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
      providesTags: ["Payment"],
    }),

    // Get all Payments for -> ((ADMIN || MANAGER 🤞))
    getPaymentsForAdmin: builder.query({
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
      providesTags: ["Payment"],
    }),

    // Get all Payments for ((Specific-User))
    getPaymentsForUser: builder.query({
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
      providesTags: ["Payment"],
    }),

    // Get single payment by ID
    getPaymentById: builder.query({
      query: (paymentId) => ({
        url: `/${paymentId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data || null;
      },
      providesTags: (result, error, paymentId) => [
        { type: "Payment", id: paymentId },
      ],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  usePayShortageMutation,
  useGetPaymentByIdQuery,
  useGetPaymentsForAdminQuery,
  useGetPaymentsForCurrentUserQuery,
  useGetPaymentsForUserQuery,
} = paymentSlice;
