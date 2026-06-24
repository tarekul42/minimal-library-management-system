import { useParams, Link } from "react-router";
import { useGetBookQuery } from "@/redux/api/bookApi";
import { GENRE_LABELS } from "@/types/book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, BookOpen, Hash, MapPin, Tag, Star, Library } from "lucide-react";

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, isError } = useGetBookQuery(bookId!);
  const book = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <h1 className="text-3xl">Book not found</h1>
        <Link to="/books">
          <Button variant="outline">Back to Books</Button>
        </Link>
      </div>
    );
  }

  const authorName = typeof book.author === "string" ? book.author : book.author?.name;
  const authorId = typeof book.author === "string" ? "" : book.author?._id;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/books" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {book.coverImage ? (
          <div className="md:col-span-1">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="md:col-span-1 flex items-center justify-center h-64 bg-gray-800 rounded-lg">
            <Library className="h-16 w-16 text-gray-600" />
          </div>
        )}

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            {authorId ? (
              <Link to={`/authors/${authorId}`} className="text-lg text-blue-400 hover:underline">
                {authorName}
              </Link>
            ) : (
              <p className="text-lg text-muted-foreground">by {authorName}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{GENRE_LABELS[book.genre] || book.genre}</Badge>
            {book.available ? (
              <Badge className="bg-green-600">
                Available ({book.availableCopies}/{book.copies})
              </Badge>
            ) : (
              <Badge variant="destructive">Not Available</Badge>
            )}
            {book.avgRating > 0 && (
              <Badge variant="outline">
                <Star className="h-3 w-3 mr-1 text-yellow-400" />
                {book.avgRating.toFixed(1)} ({book.reviewCount})
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span>ISBN: {book.isbn}</span>
            </div>
            {book.pages && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{book.pages} pages</span>
              </div>
            )}
            {book.publisher && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{book.publisher}{book.publishedYear ? `, ${book.publishedYear}` : ""}</span>
              </div>
            )}
            {book.shelfLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Shelf: {book.shelfLocation}</span>
              </div>
            )}
          </div>

          {book.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{book.description}</p>
            </div>
          )}

          {book.tags && book.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                <Tag className="h-4 w-4 text-muted-foreground mr-1" />
                {book.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
