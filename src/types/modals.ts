export interface IModalState {
  type: "view" | "edit" | "borrow" | "delete" | null;
  bookId: string | null;
}

export interface IOpenModalPayload {
  type: "view" | "edit" | "borrow" | "delete";
  bookId: string;
}
