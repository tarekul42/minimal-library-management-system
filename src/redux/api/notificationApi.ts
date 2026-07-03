import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { INotification } from "@/types/notification";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<IApiResponse<INotification[]>, void>({
      query: () => "/notifications/me",
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
