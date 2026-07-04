import { useParams, Link } from "react-router";
import { useGetAuthorQuery, useGetAuthorBooksQuery } from "@/redux/api/authorApi";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BookCard } from "@/components/cards/BookCard";
import { BookCardSkeleton } from "@/components/cards/BookCardSkeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { IBook } from "@/types/book";

export default function AuthorDetail() {
  const { authorId } = useParams<{ authorId: string }>();
  const { data: authorData, isLoading, isError, refetch } = useGetAuthorQuery(authorId!);
  const { data: booksData, isLoading: booksLoading } = useGetAuthorBooksQuery(authorId!);

  const author = authorData?.data;
  const books: IBook[] = booksData?.data ?? [];

  if (isLoading) return <Container className="py-12"><div className="h-48 animate-pulse rounded-lg bg-muted" /></Container>;
  if (isError || !author) return <ErrorState title="Author not found" onRetry={refetch} />;

  const initials = author.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: "Authors", href: "/authors" }, { label: author.name }]} />
      <Button asChild variant="ghost" size="sm" className="mt-4">
        <Link to="/authors"><ArrowLeft className="mr-2 h-4 w-4" /> All authors</Link>
      </Button>

      <Card className="mt-6 p-0">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:p-8">
          <Avatar className="h-32 w-32 shrink-0">
            <AvatarImage src={author.photo} alt={author.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-3xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">{author.name}</h1>
            {author.bio && <p className="text-muted-foreground text-pretty">{author.bio}</p>}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {author.birthDate && <span>Born: <strong className="text-foreground">{new Date(author.birthDate).toLocaleDateString()}</strong></span>}
              <span>Books in catalog: <strong className="text-foreground">{books.length}</strong></span>
            </div>
          </div>
        </CardContent>
      </Card>

      <PageHeader title={`Books by ${author.name}`} className="mt-12 border-0 pb-0" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {booksLoading
          ? Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)
          : books.map((b) => <BookCard key={b._id} book={b} />)}
      </div>
      {!booksLoading && books.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">No books by this author in the catalog yet.</p>
      )}
    </Container>
  );
}
