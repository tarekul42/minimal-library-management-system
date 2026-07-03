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

export interface IBorrowTrend {
  year: number;
  month: number;
  count: number;
}

export interface IGenreDistribution {
  genre: string;
  count: number;
}
