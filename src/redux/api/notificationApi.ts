import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { INotification } from "@/types/notification";

interface IPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<IPaginatedResponse<INotification>, void | { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/notifications/me",
        params: params || {},
      }),
      providesTags: ["notification"],
    }),

    markNotificationRead: builder.mutation<IApiResponse<INotification>, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["notification"],
    }),

    markAllNotificationsRead: builder.mutation<IApiResponse<void>, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PUT",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationApi;
