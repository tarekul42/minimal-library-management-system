import type { IApiResponse } from "@/types/book";
import type { IReservation, ICreateReservationInput } from "@/types/reservation";
import { baseApi } from "./baseApi";

export const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReservations: builder.query<IApiResponse<IReservation[]>, void>({
      query: () => "/reservations",
      providesTags: ["reservation"],
    }),

    createReservation: builder.mutation<IApiResponse<IReservation>, ICreateReservationInput>({
      query: (body) => ({
        url: "/reservations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reservation", "book"],
    }),

    cancelReservation: builder.mutation<IApiResponse<IReservation>, string>({
      query: (id) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reservation", "book"],
    }),

    getAllReservations: builder.query<IApiResponse<IReservation[]>, void>({
      query: () => "/reservations/all",
      providesTags: ["reservation"],
    }),

    getBookReservationQueue: builder.query<IApiResponse<IReservation[]>, string>({
      query: (bookId) => `/reservations/book/${bookId}`,
      providesTags: ["reservation"],
    }),

    fulfillReservation: builder.mutation<IApiResponse<IReservation>, string>({
      query: (id) => ({
        url: `/reservations/${id}/fulfill`,
        method: "PUT",
      }),
      invalidatesTags: ["reservation", "book"],
    }),
  }),
});

export const {
  useGetMyReservationsQuery,
  useCreateReservationMutation,
  useCancelReservationMutation,
  useGetAllReservationsQuery,
  useGetBookReservationQueueQuery,
  useFulfillReservationMutation,
} = reservationApi;
