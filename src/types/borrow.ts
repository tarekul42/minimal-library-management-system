export interface IBorrow {
  _id: string;
  user: { _id: string; name: string; email: string };
  book: { _id: string; title: string; isbn: string };
  quantity: number;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string;
  status: "active" | "returned" | "overdue";
  fine?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBorrowInput {
  book: string;
  quantity: number;
  dueDate: string;
}
