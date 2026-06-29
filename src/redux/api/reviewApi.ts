import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { IReview, ICreateReviewInput } from "@/types/review";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookReviews: builder.query<IApiResponse<IReview[]>, string>({
      query: (bookId) => `/reviews/book/${bookId}`,
      providesTags: ["review"],
    }),

    createReview: builder.mutation<
      IApiResponse<IReview>,
      { bookId: string; body: ICreateReviewInput }
    >({
      query: ({ bookId, body }) => ({
        url: `/reviews/book/${bookId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["review", "book"],
    }),
  }),
});

export const { useGetBookReviewsQuery, useCreateReviewMutation } = reviewApi;
