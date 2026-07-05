export interface IFine {
  _id: string;
  user: { _id: string; name: string; email: string };
  borrow: {
    _id: string;
    book: { _id: string; title: string; isbn: string };
  };
  amount: number;
  reason: string;
  paid: boolean;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}
