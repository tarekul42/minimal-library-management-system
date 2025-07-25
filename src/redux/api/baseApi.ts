import type { IBook } from "@/types/book";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api-iota.vercel.app/api",
  }),
  tagTypes: ["book", "borrow"],
  endpoints: (builder) => ({
    // get books query
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),

    // create book
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),

    // get book
    getBook: builder.query({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "GET",
      }),
    }),

    // update book
    editBook: builder.mutation<
      IBook,
      { bookId: string; bookData: Partial<IBook> }
    >({
      query: ({ bookId, bookData }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),

    // delete book
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),

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

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useGetBookQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
