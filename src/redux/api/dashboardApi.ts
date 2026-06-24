import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { IDashboardStats, IPopularBook } from "@/types/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<IApiResponse<IDashboardStats>, void>({
      query: () => "/dashboard/stats",
      providesTags: ["dashboard"],
    }),

    getPopularBooks: builder.query<IApiResponse<IPopularBook[]>, void>({
      query: () => "/dashboard/popular-books",
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetPopularBooksQuery } = dashboardApi;
