import type { IApiResponse } from "@/types/book";
import type { IFine } from "@/types/fine";
import { baseApi } from "./baseApi";

interface IPaginatedResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const finesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyFines: builder.query<IPaginatedResponse<IFine>, void | { page?: number; limit?: number; status?: string }>({
      query: (params) => ({
        url: "/fines/me",
        params: params || {},
      }),
      providesTags: ["fine"],
    }),

    getAllFines: builder.query<IPaginatedResponse<IFine>, void | { page?: number; limit?: number; status?: string }>({
      query: (params) => ({
        url: "/fines",
        params: params || {},
      }),
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
