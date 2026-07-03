import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { newsletterApi } from "./api/newsletterApi";
import modalReducer from "./features/modalSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
    modal: modalReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware, newsletterApi.middleware);
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
