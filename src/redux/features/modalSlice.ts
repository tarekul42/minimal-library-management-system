import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  type: "view" | "edit" | "borrow" | "delete" | null;
  bookId: string | null;
}

const initialState: ModalState = {
  type: null,
  bookId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        type: "view" | "edit" | "borrow" | "delete";
        bookId: string;
      }>,
    ) => {
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
