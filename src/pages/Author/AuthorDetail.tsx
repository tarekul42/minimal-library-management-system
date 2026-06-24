import { useParams, Link } from "react-router";
import { useGetAuthorQuery, useGetAuthorBooksQuery } from "@/redux/api/authorApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, User, BookOpen } from "lucide-react";
import type { IBook } from "@/types/book";
import { GENRE_LABELS } from "@/types/book";

const AuthorDetail = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const { data: authorData, isLoading: authorLoading, isError: authorError } = useGetAuthorQuery(authorId!);
  const { data: booksData, isLoading: booksLoading } = useGetAuthorBooksQuery(authorId!);

  const author = authorData?.data;
  const books: IBook[] = booksData?.data || [];

  if (authorLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-6 w-64" />
      </div>
    );
  }

  if (authorError || !author) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <h1 className="text-3xl">Author not found</h1>
        <Link to="/authors">
          <Button variant="outline">Back to Authors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/authors" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Authors
      </Link>

      <div className="flex items-start gap-6 mb-8">
        {author.photo ? (
          <img src={author.photo} alt={author.name} className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="h-10 w-10 text-gray-400" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{author.name}</h1>
          {author.birthDate && (
            <p className="text-sm text-muted-foreground mt-1">
              Born: {new Date(author.birthDate).toLocaleDateString()}
            </p>
          )}
          {author.bio && <p className="text-muted-foreground mt-3 max-w-2xl">{author.bio}</p>}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5" />
        Books by {author.name}
      </h2>

      {booksLoading ? (
        <Spinner size={32} />
      ) : books.length === 0 ? (
        <p className="text-muted-foreground">No books by this author yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-colors h-full">
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold truncate">{book.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {GENRE_LABELS[book.genre] || book.genre}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    ISBN: {book.isbn} | {book.available ? `${book.availableCopies}/${book.copies} available` : "Unavailable"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorDetail;
