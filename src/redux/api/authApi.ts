import { baseApi } from "./baseApi";
import type { ILoginCredentials, IRegisterCredentials } from "@/types/auth";
import type { IApiResponse } from "@/types/book";

interface IAuthData {
  user: import("@/types/auth").IUser;
  accessToken: string;
}

interface IRefreshData {
  user: import("@/types/auth").IUser;
  accessToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthData, ILoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: IApiResponse<IAuthData>) => response.data,
    }),

    register: builder.mutation<IAuthData, IRegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: IApiResponse<IAuthData>) => response.data,
    }),

    refreshToken: builder.mutation<IRefreshData, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      transformResponse: (response: IApiResponse<IRefreshData>) => response.data,
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
