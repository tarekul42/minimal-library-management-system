export interface IReview {
  _id: string;
  user: { _id: string; name: string; avatar?: string };
  book: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ICreateReviewInput {
  rating: number;
  comment?: string;
}
