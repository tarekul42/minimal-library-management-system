export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IAuthorRef {
  _id: string;
  name: string;
}

export interface IBook {
  _id: string;
  title: string;
  author: IAuthorRef | string;
  genre: Genre;
  isbn: string;
  description?: string;
  coverImage?: string;
  pages?: number;
  publisher?: string;
  publishedYear?: number;
  copies: number;
  availableCopies: number;
  tags: string[];
  avgRating: number;
  reviewCount: number;
  shelfLocation?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBookQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: Genre;
  available?: boolean;
  sortBy?: "title" | "author" | "createdAt" | "avgRating";
  sortOrder?: "asc" | "desc";
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string | null;
}
