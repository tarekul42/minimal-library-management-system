import type { IModalState, IOpenModalPayload } from "@/types/modals";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: IModalState = {
  type: null,
  bookId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IOpenModalPayload>) => {
      state.type = action.payload.type;
      state.bookId = action.payload.bookId;
    },
    closeModal: (state) => {
      state.type = null;
      state.bookId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
