import { baseApi } from "./baseApi";
import type {
  IApiResponse,
  IBook,
  IBookQueryParams,
} from "@/types/book";

export interface IBooksResponse {
  success: boolean;
  message: string;
  data: IBook[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksResponse, IBookQueryParams | void>({
      query: (params) => ({
        url: "/books",
        params: params || {},
      }),
      providesTags: ["book"],
    }),

    createBook: builder.mutation<IApiResponse<IBook>, Record<string, unknown>>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),

    getBook: builder.query<IApiResponse<IBook>, string>({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["book"],
    }),

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
