import { Link } from "react-router";
import { Star, BookMarked, Heart, Clock, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { IBook } from "@/types/book";
import { GENRE_LABELS } from "@/config/constants";
import { getAuthorName } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";
import { useAddToWishlistMutation } from "@/redux/api/wishlistApi";
import { toast } from "sonner";

interface Props { book: IBook }

export function BookDetailHero({ book }: Props) {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [borrow, { isLoading: borrowing }] = useBorrowBookMutation();
  const [addToWishlist, { isLoading: wishlisting }] = useAddToWishlistMutation();
  const [borrowed, setBorrowed] = useState(false);

  const handleBorrow = async () => {
    if (!isAuthenticated) return toast.info("Please sign in to borrow books.");
    try {
      await borrow({ book: book._id, quantity: 1, dueDate: new Date(Date.now() + 14 * 86400000).toISOString() }).unwrap();
      setBorrowed(true);
      toast.success("Book borrowed! Check your dashboard for the due date.");
    } catch {
      toast.error("Failed to borrow book.");
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) return toast.info("Please sign in to use your wishlist.");
    try {
      await addToWishlist(book._id).unwrap();
      toast.success("Wishlist updated.");
    } catch {
      toast.error("Failed to update wishlist.");
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]">
      {/* Cover + share */}
      <div className="space-y-3">
        <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-lg border border-border shadow-md">
          <img src={book.coverImage || "/images/book-placeholder.svg"} alt={book.title} loading="lazy" className="h-full w-full object-cover" />
        </AspectRatio>
        <Button variant="outline" size="sm" className="w-full" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }}>
          <Share2 className="mr-2 h-4 w-4" /> Share this book
        </Button>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{GENRE_LABELS[book.genre] ?? book.genre}</Badge>
          {book.available
            ? <Badge className="bg-secondary text-secondary-foreground">{book.availableCopies} available</Badge>
            : <Badge variant="destructive">Currently checked out</Badge>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-balance">{book.title}</h1>
        <p className="text-lg text-muted-foreground">
          by <Link to={`/authors/${typeof book.author === "string" ? book.author : book.author._id}`} className="text-primary hover:underline">{getAuthorName(book.author)}</Link>
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={i < Math.round(book.avgRating) ? "h-5 w-5 fill-accent text-accent" : "h-5 w-5 text-muted-foreground"} />
            ))}
          </div>
          <span className="font-medium">{book.avgRating.toFixed(1)}</span>
          <span className="text-muted-foreground">({book.reviewCount} reviews)</span>
        </div>

        <p className="text-pretty">{book.description || "No description available for this title."}</p>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
          <div><dt className="text-xs text-muted-foreground">ISBN</dt><dd className="font-medium">{book.isbn}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Published</dt><dd className="font-medium">{book.publishedYear ?? "—"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Publisher</dt><dd className="font-medium">{book.publisher ?? "—"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Pages</dt><dd className="font-medium">{book.pages ?? "—"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Shelf</dt><dd className="font-medium">{book.shelfLocation ?? "—"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Copies</dt><dd className="font-medium">{book.availableCopies}/{book.copies}</dd></div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleBorrow} disabled={borrowing || borrowed || !book.available} size="lg">
            {borrowed ? <><Check className="mr-2 h-4 w-4" /> Borrowed</> : <><BookMarked className="mr-2 h-4 w-4" /> Borrow now</>}
          </Button>
          <Button onClick={handleWishlist} disabled={wishlisting} variant="outline" size="lg">
            <Heart className="mr-2 h-4 w-4" /> Wishlist
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/books"><Clock className="mr-2 h-4 w-4" /> Reserve</Link>
          </Button>
        </div>

        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {book.tags.map((t) => <Badge key={t} variant="outline">#{t}</Badge>)}
          </div>
        )}
      </div>
    </div>
  );
}
