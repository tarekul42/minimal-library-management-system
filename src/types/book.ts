export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string | null;
}
