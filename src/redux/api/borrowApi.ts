import type { IApiResponse } from "@/types/book";
import type { IBorrowSummary } from "@/types/borrowSummary";
import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // borrow book
    borrowBook: builder.mutation<
      IApiResponse<void>,
      { book: string; quantity: number; dueDate: string }
    >({
      query: (bookData) => ({
        url: "/borrow",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    // get borrow summary
    getBorrowSummary: builder.query<IApiResponse<IBorrowSummary[]>, void>({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
