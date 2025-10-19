import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api-iota.vercel.app/api",
  }),
  tagTypes: ["book", "borrow"],
  endpoints: () => ({}),
});
