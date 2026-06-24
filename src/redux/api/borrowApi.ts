import type { IApiResponse } from "@/types/book";
import type { IBorrow, ICreateBorrowInput } from "@/types/borrow";
import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IApiResponse<IBorrow>, ICreateBorrowInput>({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    getBorrowSummary: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),

    getMyBorrows: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),

    getBorrow: builder.query<IApiResponse<IBorrow>, string>({
      query: (id) => `/borrow/${id}`,
      providesTags: ["borrow"],
    }),

    returnBook: builder.mutation<IApiResponse<IBorrow>, string>({
      query: (id) => ({
        url: `/borrow/${id}/return`,
        method: "PUT",
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    getActiveBorrows: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrow/active",
      providesTags: ["borrow"],
    }),

    getOverdueBorrows: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrow/overdue",
      providesTags: ["borrow"],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
  useGetMyBorrowsQuery,
  useGetBorrowQuery,
  useReturnBookMutation,
  useGetActiveBorrowsQuery,
  useGetOverdueBorrowsQuery,
} = borrowApi;
