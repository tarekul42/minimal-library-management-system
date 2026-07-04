import { useParams, Navigate } from "react-router";
import { useGetBookQuery, useGetBooksQuery } from "@/redux/api/bookApi";
import { useGetBookReviewsQuery } from "@/redux/api/reviewApi";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Seo } from "@/components/Seo";
import { DetailSkeleton } from "@/components/ui/detail-skeleton";
import { BookDetailHero } from "./BookDetailHero";
import { BookDetailTabs } from "./BookDetailTabs";
import { RelatedBooks } from "./RelatedBooks";
import type { IReview } from "@/types/review";

export default function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, isError, refetch } = useGetBookQuery(bookId!, { skip: !bookId });
  const { data: reviewsData, isError: reviewsError } = useGetBookReviewsQuery(bookId!, { skip: !bookId });
  const book = data?.data;
  const reviews: IReview[] = reviewsData?.data ?? [];

  const { data: relatedData, isError: relatedError } = useGetBooksQuery(
    book ? { genre: book.genre, limit: 5 } : undefined,
    { skip: !book }
  );
  const related = (relatedData?.data ?? []).filter((b) => b._id !== bookId).slice(0, 4);

  if (!bookId) return <Navigate to="/books" replace />;

  if (isLoading) return <Container className="py-12"><DetailSkeleton /></Container>;
  if (isError || !book) return <ErrorState title="Book not found" message="This book may have been removed." onRetry={refetch} />;

  return (
    <Container className="py-8 md:py-12">
      <Seo title={book.title} description={book.description ? book.description.slice(0, 160) : undefined} />
      <Breadcrumb items={[
        { label: "Books", href: "/books" },
        { label: book.title },
      ]} />
      <BookDetailHero book={book} />
      <BookDetailTabs book={book} reviews={reviews} reviewsError={reviewsError} />
      <RelatedBooks books={related} isError={relatedError} />
    </Container>
  );
}
