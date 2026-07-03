import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { BookCard } from "@/components/cards/BookCard";
import { BookCardSkeleton } from "@/components/cards/BookCardSkeleton";
import { useGetBooksQuery } from "@/redux/api/bookApi";

export function FeaturedBooks() {
  const { data, isLoading, isError, refetch } = useGetBooksQuery({ limit: 8, sortBy: "avgRating", sortOrder: "desc" });
  const books = data?.data ?? [];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="Featured"
          title="Top-rated books this month"
          description="Hand-picked titles our members are loving right now."
          action={
            <Button asChild variant="outline">
              <Link to="/books">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)
            : isError
            ? <p className="col-span-full text-center text-muted-foreground">Failed to load books. <button onClick={refetch} className="text-primary underline">Retry</button></p>
            : books.map((book) => <BookCard key={book._id} book={book} />)}
        </div>
      </Container>
    </section>
  );
}
