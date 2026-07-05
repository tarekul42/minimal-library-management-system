import type { IApiResponse } from "@/types/book";
import type { IReservation, ICreateReservationInput } from "@/types/reservation";
import { baseApi } from "./baseApi";

interface IPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReservations: builder.query<IPaginatedResponse<IReservation>, void | { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/reservations",
        params: params || {},
      }),
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

    cancelReservation: builder.mutation<void, string>({
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
