import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { IDashboardStats, IPopularBook, IBorrowTrend, IGenreDistribution } from "@/types/dashboard";

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

    getBorrowTrends: builder.query<IApiResponse<IBorrowTrend[]>, void>({
      query: () => "/dashboard/trends",
      providesTags: ["dashboard"],
    }),

    getGenreDistribution: builder.query<IApiResponse<IGenreDistribution[]>, void>({
      query: () => "/dashboard/genre-distribution",
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetPopularBooksQuery,
  useGetBorrowTrendsQuery,
  useGetGenreDistributionQuery,
} = dashboardApi;
