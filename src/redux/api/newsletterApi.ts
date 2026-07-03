import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsletterApi = createApi({
  reducerPath: "newsletterApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    newsletter: builder.mutation<{ success: boolean }, { email: string }>({
      query: (body) => ({ url: "/newsletter/subscribe", method: "POST", body }),
    }),
  }),
});

export const { useNewsletterMutation } = newsletterApi;
