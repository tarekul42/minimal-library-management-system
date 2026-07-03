import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import type { IBookQueryParams } from "@/types/book";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BookCard } from "@/components/cards/BookCard";
import { BookCardSkeleton } from "@/components/cards/BookCardSkeleton";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { BooksFilters } from "./BooksFilters";
import { BooksSort } from "./BooksSort";
import { BooksPagination } from "./BooksPagination";
import { BooksMobileFilters } from "./BooksMobileFilters";
import { SearchX } from "lucide-react";

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const genre = searchParams.get("genre") ?? "all";
  const availability = searchParams.get("availability") ?? "all";
  const minRating = Number(searchParams.get("minRating") ?? "0");
  const sortBy = (searchParams.get("sortBy") ?? "title") as IBookQueryParams["sortBy"];
  const sortOrder = (searchParams.get("sortOrder") ?? "asc") as IBookQueryParams["sortOrder"];
  const page = Number(searchParams.get("page") ?? "1");

  const debouncedSearch = useDebounce(search, 350);

  const params = useMemo<IBookQueryParams>(() => {
    const p: IBookQueryParams = { page, limit: 12, sortBy, sortOrder };
    if (debouncedSearch) p.search = debouncedSearch;
    if (genre && genre !== "all") p.genre = genre as IBookQueryParams["genre"];
    if (availability === "available") p.available = true;
    return p;
  }, [page, debouncedSearch, genre, availability, sortBy, sortOrder]);

  const { data, isLoading, isError, refetch } = useGetBooksQuery(params);
  const books = data?.data ?? [];
  const meta = data?.meta;

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "all" && value !== "0") next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  };

  const clientFiltered = books.filter((b) => b.avgRating >= minRating);

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: "Books" }]} />
      <PageHeader
        title="Explore Books"
        description="Browse our catalog of 10,000+ titles across six genres."
        className="mt-4"
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters sidebar (desktop) */}
        <aside className="hidden lg:block">
          <BooksFilters
            search={search}
            genre={genre}
            availability={availability}
            minRating={minRating}
            onSearchChange={(v) => updateParam("search", v)}
            onGenreChange={(v) => updateParam("genre", v)}
            onAvailabilityChange={(v) => updateParam("availability", v)}
            onMinRatingChange={(v) => updateParam("minRating", String(v))}
            onClear={() => setSearchParams({})}
          />
        </aside>

        {/* Main column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {meta ? `${meta.total} books` : "Loading..."}
            </p>
            <div className="flex items-center gap-2">
              <BooksMobileFilters
                search={search}
                genre={genre}
                availability={availability}
                minRating={minRating}
                onSearchChange={(v) => updateParam("search", v)}
                onGenreChange={(v) => updateParam("genre", v)}
                onAvailabilityChange={(v) => updateParam("availability", v)}
                onMinRatingChange={(v) => updateParam("minRating", String(v))}
                onClear={() => setSearchParams({})}
              />
              <BooksSort sortBy={sortBy} sortOrder={sortOrder} onChange={(s, o) => { updateParam("sortBy", s ?? "title"); updateParam("sortOrder", o ?? "asc"); }} />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => <BookCardSkeleton key={i} />)}
            </div>
          ) : isError ? (
            <ErrorState message="Failed to load books" onRetry={refetch} />
          ) : clientFiltered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No books match your filters"
              description="Try adjusting your search or clearing some filters."
              action={<button onClick={() => setSearchParams({})} className="text-primary underline">Clear all filters</button>}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {clientFiltered.map((book) => <BookCard key={book._id} book={book} />)}
            </div>
          )}

          {meta && meta.totalPages > 1 && (
            <BooksPagination page={page} totalPages={meta.totalPages} onChange={(p) => updateParam("page", String(p))} />
          )}
        </div>
      </div>
    </Container>
  );
}
