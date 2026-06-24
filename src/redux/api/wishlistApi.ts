import { baseApi } from "./baseApi";
import type { IApiResponse } from "@/types/book";
import type { IWishlistItem } from "@/types/wishlist";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<IApiResponse<IWishlistItem[]>, void>({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),

    addToWishlist: builder.mutation<IApiResponse<IWishlistItem>, string>({
      query: (bookId) => ({
        url: `/wishlist/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["wishlist"],
    }),

    removeFromWishlist: builder.mutation<IApiResponse<void>, string>({
      query: (bookId) => ({
        url: `/wishlist/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
