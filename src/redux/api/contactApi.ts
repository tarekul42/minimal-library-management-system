import { baseApi } from "./baseApi";

interface IContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<void, IContactPayload>({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateContactMutation,
} = contactApi;
