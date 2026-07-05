import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { IAuthor, ICreateAuthorInput, IUpdateAuthorInput } from "@/types/author";
import type { IBook } from "@/types/book";

export const authorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query<IApiResponse<IAuthor[]>, void>({
      query: () => "/authors",
      providesTags: ["author"],
    }),

    getAuthor: builder.query<IApiResponse<IAuthor>, string>({
      query: (id) => `/authors/${id}`,
      providesTags: ["author"],
    }),

    getAuthorBooks: builder.query<IApiResponse<IBook[]>, string>({
      query: (id) => `/authors/${id}/books`,
      providesTags: ["author"],
    }),

    createAuthor: builder.mutation<IApiResponse<IAuthor>, ICreateAuthorInput>({
      query: (body) => ({
        url: "/authors",
        method: "POST",
        body,
      }),
      invalidatesTags: ["author"],
    }),

    updateAuthor: builder.mutation<
      IApiResponse<IAuthor>,
      { id: string; body: IUpdateAuthorInput }
    >({
      query: ({ id, body }) => ({
        url: `/authors/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["author"],
    }),

    deleteAuthor: builder.mutation<void, string>({
      query: (id) => ({
        url: `/authors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["author"],
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useGetAuthorQuery,
  useGetAuthorBooksQuery,
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorApi;
