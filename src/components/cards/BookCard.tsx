import { Link } from "react-router";
import { Star, BookMarked } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { IBook } from "@/types/book";
import { GENRE_LABELS } from "@/config/constants";
import { getAuthorName } from "@/lib/utils";

interface BookCardProps {
  book: IBook;
}

export function BookCard({ book }: BookCardProps) {
  const authorName = getAuthorName(book.author);

  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <Link to={`/books/${book._id}`} className="block">
        <AspectRatio ratio={3 / 4}>
          <img
            src={book.coverImage || "/images/book-placeholder.svg"}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="shrink-0">
            {GENRE_LABELS[book.genre] ?? book.genre}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium text-foreground">{book.avgRating.toFixed(1)}</span>
            <span>({book.reviewCount})</span>
          </div>
        </div>
        <Link to={`/books/${book._id}`}>
          <h3 className="line-clamp-2 font-semibold leading-snug hover:text-primary">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">by {authorName}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{book.description || "No description available."}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BookMarked className="h-3 w-3" />
            {book.availableCopies}/{book.copies} available
          </span>
          <span>{book.publishedYear}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" size="sm">
          <Link to={`/books/${book._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
