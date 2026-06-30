import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setCredentials, logout } from "../features/authSlice";

interface IRefreshResponse {
  success: boolean;
  data?: { user: import("@/types/auth").IUser; accessToken: string };
}

let refreshPromise: Promise<IRefreshResponse | undefined> | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const res = await baseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        );
        return res.data as IRefreshResponse | undefined;
      })();
    }

    try {
      const responseData = await refreshPromise;
      const accessToken = responseData?.data?.accessToken;

      if (accessToken && responseData?.data?.user) {
        api.dispatch(setCredentials({ user: responseData.data.user, accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch {
      api.dispatch(logout());
    } finally {
      refreshPromise = null;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["book", "borrow", "author", "category", "fine", "dashboard", "review", "wishlist", "notification", "reservation", "user"],
  endpoints: () => ({}),
});
