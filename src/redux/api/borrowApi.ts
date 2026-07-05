import type { IApiResponse } from "@/types/book";
import type { IBorrow, ICreateBorrowInput } from "@/types/borrows";
import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IApiResponse<IBorrow>, ICreateBorrowInput>({
      query: (body) => ({
        url: "/borrows",
        method: "POST",
        body,
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    getMyBorrows: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrows/me",
      providesTags: ["borrow"],
    }),

    getAllBorrows: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrows",
      providesTags: ["borrow"],
    }),

    getBorrow: builder.query<IApiResponse<IBorrow>, string>({
      query: (id) => `/borrows/${id}`,
      providesTags: ["borrow"],
    }),

    returnBook: builder.mutation<IApiResponse<IBorrow>, string>({
      query: (id) => ({
        url: `/borrows/${id}/return`,
        method: "PUT",
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    renewBook: builder.mutation<IApiResponse<IBorrow>, string>({
      query: (id) => ({
        url: `/borrows/${id}/renew`,
        method: "PUT",
      }),
      invalidatesTags: ["borrow"],
    }),

    getActiveBorrows: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrows/active",
      providesTags: ["borrow"],
    }),

    getOverdueBorrows: builder.query<IApiResponse<IBorrow[]>, void>({
      query: () => "/borrows/overdue",
      providesTags: ["borrow"],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetMyBorrowsQuery,
  useGetAllBorrowsQuery,
  useGetBorrowQuery,
  useReturnBookMutation,
  useRenewBookMutation,
  useGetActiveBorrowsQuery,
  useGetOverdueBorrowsQuery,
} = borrowApi;
