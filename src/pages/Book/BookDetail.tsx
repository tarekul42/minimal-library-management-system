import { useParams, Link } from "react-router";
import { useGetBookQuery } from "@/redux/api/bookApi";
import { useGetBookReviewsQuery } from "@/redux/api/reviewApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BookInfo from "./BookInfo";
import ReviewSection from "./ReviewSection";
import type { IReview } from "@/types/review";

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, isError } = useGetBookQuery(bookId!);
  const { data: reviewsData } = useGetBookReviewsQuery(bookId!);

  const book = data?.data;
  const reviews: IReview[] = reviewsData?.data || [];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 space-y-6">
        <Skeleton className="h-8 w-48" /> <Skeleton className="h-64 w-full" />
        <Skeleton className="h-6 w-3/4" /> <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <h1 className="text-3xl">Book not found</h1>
        <Link to="/books"><Button variant="outline">Back to Books</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-10">
      <BookInfo book={book} />
      <ReviewSection bookId={bookId!} reviews={reviews} />
    </div>
  );
};

export default BookDetail;
