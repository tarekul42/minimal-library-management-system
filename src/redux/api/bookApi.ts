import type { IBook } from "@/types/book";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
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
      providesTags: ["book"],
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
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useGetBookQuery,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
