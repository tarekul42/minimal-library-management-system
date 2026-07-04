import { Link } from "react-router";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ErrorState } from "@/components/feedback/ErrorState";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import type { IBook } from "@/types/book";
import { getAuthorName } from "@/lib/utils";

export function Hero() {
  const { data, isLoading, isError, refetch } = useGetBooksQuery({ limit: 5, sortBy: "avgRating", sortOrder: "desc" });
  const featured = (data?.data ?? []).slice(0, 5);

  if (isError) {
    return (
      <section className="relative gradient-hero overflow-hidden">
        <Container className="flex min-h-[60vh] items-center justify-center py-16 lg:min-h-[70vh] lg:py-24">
          <ErrorState message="Failed to load featured books" onRetry={refetch} />
        </Container>
      </section>
    );
  }

  return (
    <section className="relative gradient-hero overflow-hidden">
      <Container className="grid min-h-[60vh] grid-cols-1 items-center gap-12 py-16 lg:min-h-[70vh] lg:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            New: AI-powered book recommendations
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl text-balance">
            Discover your next <span className="text-primary">great read</span> at the Athenaeum
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty">
            Browse 10,000+ books across six genres, reserve titles in seconds, and borrow from anywhere — your library, reimagined for the digital age.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/books">
                Explore Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/register">Become a Member</Link>
            </Button>
          </div>
          <div className="flex items-center gap-3 pt-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["A", "B", "C", "D"].map((i) => (
                <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  {i}
                </span>
              ))}
            </div>
            <span>Trusted by <strong className="text-foreground">12,000+</strong> readers</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <div className="space-y-2 text-center">
                <Skeleton className="mx-auto h-4 w-3/4" />
                <Skeleton className="mx-auto h-3 w-1/2" />
              </div>
            </div>
          ) : (
            <Carousel plugins={[Autoplay({ delay: 4000 })]} className="w-full">
              <CarouselContent>
                {featured.map((book: IBook) => (
                  <CarouselItem key={book._id}>
                    <div className="space-y-3">
                      <Link to={`/books/${book._id}`} className="block">
                        <div className="aspect-[3/4] overflow-hidden rounded-lg border border-border shadow-md">
                          <img
                            src={book.coverImage || "/images/book-placeholder.svg"}
                            alt={book.title}
                            fetchPriority="high"
                            className="h-full w-full object-cover"
                            onError={(e) => { e.currentTarget.src = "/images/book-placeholder.svg"; }}
                          />
                        </div>
                      </Link>
                      <div className="text-center">
                        <p className="font-semibold line-clamp-1">{book.title}</p>
                        <p className="text-sm text-muted-foreground">by {getAuthorName(book.author)}</p>
                        <div className="mt-1 inline-flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-medium">{book.avgRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          )}
        </div>
      </Container>
    </section>
  );
}
