import { Link } from "react-router";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <Link to={`/books/${book._id}`} className="group block">
      <Card className="overflow-hidden border-border/60 p-0 transition-colors group-hover:border-primary/40">
        <div className="relative">
          <AspectRatio ratio={3 / 4}>
            <img
              src={book.coverImage || "/images/book-placeholder.svg"}
              alt={book.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => { e.currentTarget.src = "/images/book-placeholder.svg"; }}
            />
          </AspectRatio>
          <div className="absolute inset-0 flex items-start justify-between gap-2 bg-gradient-to-t from-black/50 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Badge variant="secondary" className="text-xs">
              {GENRE_LABELS[book.genre] ?? book.genre}
            </Badge>
            <div className="inline-flex items-center gap-1 rounded-md bg-background/50 px-2 py-0.5 text-xs text-primary-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {book.avgRating.toFixed(1)}
            </div>
          </div>
        </div>
        <CardContent className="space-y-1 p-5">
          <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-primary">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground">by {authorName}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
