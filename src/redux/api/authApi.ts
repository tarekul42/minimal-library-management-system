import { baseApi } from "./baseApi";
import type { IAuthResponse, ILoginCredentials, IRegisterCredentials } from "@/types/auth";
import type { IApiResponse } from "@/types/book";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResponse, ILoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: IApiResponse<IAuthResponse>) => response.data,
    }),

    register: builder.mutation<IAuthResponse, IRegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: IApiResponse<IAuthResponse>) => response.data,
    }),

    refreshToken: builder.mutation<
      { accessToken: string; refreshToken: string },
      string
    >({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      }),
      transformResponse: (response: IApiResponse<{ accessToken: string; refreshToken: string }>) =>
        response.data,
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
