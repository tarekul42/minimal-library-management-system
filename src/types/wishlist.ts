export interface IWishlistItem {
  _id: string;
  user: string;
  book: {
    _id: string;
    title: string;
    isbn: string;
    genre: string;
    coverImage?: string;
    availableCopies: number;
    copies: number;
  };
  createdAt: string;
}
