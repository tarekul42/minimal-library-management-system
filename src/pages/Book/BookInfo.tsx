import { Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from "@/redux/api/wishlistApi";
import { useCreateReservationMutation } from "@/redux/api/reservationApi";
import { GENRE_LABELS } from "@/config/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ArrowLeft, Calendar, BookOpen, Hash, MapPin, Tag, Star, Library, Heart, Clock,
} from "lucide-react";
import type { IBook } from "@/types/book";
import { getApiError } from "@/lib/utils";

interface BookInfoProps {
  book: IBook;
}

const BookInfo = ({ book }: BookInfoProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !user });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [createReservation] = useCreateReservationMutation();

  const inWishlist = wishlistData?.data?.some((w) => w.book._id === book._id);

  const handleToggleWishlist = async () => {
    if (!user) { toast.error("Sign in to use wishlist"); return; }
    try {
      if (inWishlist) {
        await removeFromWishlist(book._id).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(book._id).unwrap();
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  const handleReserve = async () => {
    if (!user) { toast.error("Sign in to reserve"); return; }
    try {
      await createReservation({ bookId: book._id }).unwrap();
      toast.success("Book reserved! You're in the queue.");
    } catch (err: unknown) {
      toast.error(getApiError(err));
    }
  };

  const authorName = typeof book.author === "string" ? book.author : book.author?.name;
  const authorId = typeof book.author === "string" ? "" : book.author?._id;

  return (
    <>
      <Link to="/books" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} className="w-full rounded-lg shadow-lg" />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
              <Library className="h-16 w-16 text-gray-600" />
            </div>
          )}
          <Button
            variant={inWishlist ? "default" : "outline"}
            className="w-full mt-4"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 mr-2 ${inWishlist ? "fill-current" : ""}`} />
            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
          </Button>
          {!book.available && (
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={handleReserve}
            >
              <Clock className="h-4 w-4 mr-2" />
              Reserve
            </Button>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            {authorId ? (
              <Link to={`/authors/${authorId}`} className="text-lg text-blue-400 hover:underline">{authorName}</Link>
            ) : (
              <p className="text-lg text-muted-foreground">by {authorName}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{GENRE_LABELS[book.genre] || book.genre}</Badge>
            {book.available ? (
              <Badge className="bg-green-600">Available ({book.availableCopies}/{book.copies})</Badge>
            ) : (
              <Badge variant="destructive">Not Available</Badge>
            )}
            {book.avgRating > 0 && (
              <Badge variant="outline"><Star className="h-3 w-3 mr-1 text-yellow-400" />{book.avgRating.toFixed(1)} ({book.reviewCount})</Badge>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2"><Hash className="h-4 w-4 text-muted-foreground" /><span>ISBN: {book.isbn}</span></div>
            {book.pages && <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-muted-foreground" /><span>{book.pages} pages</span></div>}
            {book.publisher && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>{book.publisher}{book.publishedYear ? `, ${book.publishedYear}` : ""}</span></div>}
            {book.shelfLocation && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><span>Shelf: {book.shelfLocation}</span></div>}
          </div>

          {book.description && <div><h3 className="font-semibold mb-2">Description</h3><p className="text-muted-foreground">{book.description}</p></div>}

          {book.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <Tag className="h-4 w-4 text-muted-foreground mr-1" />
              {book.tags.map((t: string) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookInfo;
