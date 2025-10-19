import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // borrow book
    borrowBook: builder.mutation({
      query: (bookData) => ({
        url: "/borrow",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    // get borrow summary
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
