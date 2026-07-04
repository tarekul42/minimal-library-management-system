import { baseApi } from "./baseApi";

const injectedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    newsletter: builder.mutation<{ success: boolean }, { email: string }>({
      query: (body) => ({ url: "/newsletter/subscribe", method: "POST", body }),
    }),
  }),
  overrideExisting: false,
});

export const { useNewsletterMutation } = injectedApi;
