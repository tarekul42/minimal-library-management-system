import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { closeModal, openModal } from "@/redux/features/modalSlice";

export const useBookModals = () => {
  const dispatch = useAppDispatch();
  const { type, bookId } = useAppSelector((state) => state.modal);

  const handleViewBook = (bookId: string) => {
    dispatch(openModal({ type: "view", bookId }));
  };

  const handleEditBook = (bookId: string) => {
    dispatch(openModal({ type: "edit", bookId }));
  };

  const handleBorrowBook = (bookId: string) => {
    dispatch(openModal({ type: "borrow", bookId }));
  };

  const handleDeleteBook = (bookId: string) => {
    dispatch(openModal({ type: "delete", bookId }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    modalType: type,
    bookId,
    handleViewBook,
    handleEditBook,
    handleBorrowBook,
    handleDeleteBook,
    handleCloseModal,
  };
};
