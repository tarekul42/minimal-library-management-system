import type { IApiResponse, IBook } from "@/types/book";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get books query
    getBooks: builder.query<IApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["book"],
    }),

    // create book
    createBook: builder.mutation<IApiResponse<IBook>, Record<string, unknown>>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),

    // get book
    getBook: builder.query<IApiResponse<IBook>, string>({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "GET",
      }),
      providesTags: ["book"],
    }),

    // update book
    editBook: builder.mutation<
      IApiResponse<IBook>,
      { bookId: string; bookData: Record<string, unknown> }
    >({
      query: ({ bookId, bookData }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),

    // delete book
    deleteBook: builder.mutation<IApiResponse<void>, string>({
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
