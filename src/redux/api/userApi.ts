import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { IUser } from "@/types/auth";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IApiResponse<IUser>, void>({
      query: () => "/users/me",
      providesTags: ["user"],
    }),

    updateUser: builder.mutation<IApiResponse<IUser>, Partial<IUser>>({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
