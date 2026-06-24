import type { IApiResponse } from "@/types/book";
import type { IFine } from "@/types/fine";
import { baseApi } from "./baseApi";

export const finesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyFines: builder.query<IApiResponse<IFine[]>, void>({
      query: () => "/fines/me",
      providesTags: ["fine"],
    }),

    getAllFines: builder.query<IApiResponse<IFine[]>, void>({
      query: () => "/fines",
      providesTags: ["fine"],
    }),

    payFine: builder.mutation<IApiResponse<IFine>, string>({
      query: (id) => ({
        url: `/fines/${id}/pay`,
        method: "POST",
      }),
      invalidatesTags: ["fine"],
    }),
  }),
});

export const {
  useGetMyFinesQuery,
  useGetAllFinesQuery,
  usePayFineMutation,
} = finesApi;
