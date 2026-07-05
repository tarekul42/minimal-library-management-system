import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { ICategory, ICreateCategoryInput } from "@/types/category";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<IApiResponse<ICategory[]>, void>({
      query: () => "/categories",
      providesTags: ["category"],
    }),

    getCategory: builder.query<IApiResponse<ICategory>, string>({
      query: (id) => `/categories/${id}`,
      providesTags: ["category"],
    }),

    createCategory: builder.mutation<IApiResponse<ICategory>, ICreateCategoryInput>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation<
      IApiResponse<ICategory>,
      { id: string; body: Record<string, unknown> }
    >({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
