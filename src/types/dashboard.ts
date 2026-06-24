export interface IDashboardStats {
  totalBooks: number;
  totalUsers: number;
  activeBorrows: number;
  overdueBorrows: number;
  unpaidFines: number;
}

export interface IPopularBook {
  _id: string;
  title: string;
  isbn: string;
  borrowCount: number;
}
