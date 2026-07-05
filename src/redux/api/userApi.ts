import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { IUser } from "@/types/auth";

interface IUserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
}

interface IUsersResponse {
  success: boolean;
  message?: string;
  data: IUser[];
  meta?: { total: number; page: number; totalPages: number };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IApiResponse<IUser>, void>({
      query: () => "/users/me",
      providesTags: ["user"],
    }),

    getAllUsers: builder.query<IUsersResponse, IUserQueryParams>({
      query: (params) => ({
        url: "/users",
        params,
      }),
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

    adminUpdateUser: builder.mutation<IApiResponse<IUser>, { id: string; body: Partial<IUser> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useAdminUpdateUserMutation,
} = userApi;
