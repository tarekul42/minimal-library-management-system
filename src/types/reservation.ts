import type { IBook } from "./book";

export type ReservationStatus = "waiting" | "fulfilled" | "cancelled";

export interface IReservation {
  _id: string;
  user: string;
  book: IBook;
  status: ReservationStatus;
  queuePosition?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateReservationInput {
  bookId: string;
}
