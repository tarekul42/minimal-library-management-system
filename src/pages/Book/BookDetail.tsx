import { useParams, Link } from "react-router";
import { useGetBookQuery } from "@/redux/api/bookApi";
import { useGetBookReviewsQuery, useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from "@/redux/api/wishlistApi";
import { useCreateReservationMutation } from "@/redux/api/reservationApi";
import { useAppSelector } from "@/redux/hook";
import { GENRE_LABELS } from "@/config/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import {
  ArrowLeft, Calendar, BookOpen, Hash, MapPin, Tag, Star, Library, Heart, MessageSquare, Clock,
} from "lucide-react";
import type { IReview } from "@/types/review";
import { getApiError } from "@/lib/utils";

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data, isLoading, isError } = useGetBookQuery(bookId!);
  const { data: reviewsData } = useGetBookReviewsQuery(bookId!);
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !user });
  const [createReview] = useCreateReviewMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [createReservation] = useCreateReservationMutation();

  const book = data?.data;
  const reviews: IReview[] = reviewsData?.data || [];

  const inWishlist = wishlistData?.data?.some((w) => w.book._id === bookId);

  const handleToggleWishlist = async () => {
    if (!user) { toast.error("Sign in to use wishlist"); return; }
    try {
      if (inWishlist) {
        await removeFromWishlist(bookId!).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(bookId!).unwrap();
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  const handleReserve = async () => {
    if (!user) { toast.error("Sign in to reserve"); return; }
    try {
      await createReservation({ bookId: bookId! }).unwrap();
      toast.success("Book reserved! You're in the queue.");
    } catch (err: unknown) {
      toast.error(getApiError(err));
    }
  };

  const handleSubmitReview = async () => {
    if (!user) { toast.error("Sign in to review"); return; }
    try {
      await createReview({ bookId: bookId!, body: { rating, comment: comment || undefined } }).unwrap();
      toast.success("Review submitted");
      setComment("");
      setRating(5);
    } catch {
      toast.error("Failed to submit review");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" /> <Skeleton className="h-64 w-full" />
        <Skeleton className="h-6 w-3/4" /> <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <h1 className="text-3xl">Book not found</h1>
        <Link to="/books"><Button variant="outline">Back to Books</Button></Link>
      </div>
    );
  }

  const authorName = typeof book.author === "string" ? book.author : book.author?.name;
  const authorId = typeof book.author === "string" ? "" : book.author?._id;

  return (
    <div className="max-w-4xl mx-auto p-6">
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

          <div className="grid grid-cols-2 gap-4 text-sm">
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

      {/* Reviews */}
      <div className="border-t border-gray-800 pt-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Reviews ({reviews.length})
        </h2>

        {/* Review Form */}
        {user && (
          <div className="mb-8 p-4 bg-gray-900 rounded-lg border border-gray-800 space-y-3">
            <h3 className="font-medium">Write a Review</h3>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className="focus:outline-none">
                  <Star className={`h-5 w-5 ${n <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                </button>
              ))}
              <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
            </div>
            <Textarea
              placeholder="Share your thoughts about this book..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button onClick={handleSubmitReview} disabled={!comment.trim()}>Submit Review</Button>
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                      {r.user?.name?.charAt(0) || "?"}
                    </div>
                    <span className="font-medium">{r.user?.name || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
                <p className="text-xs text-muted-foreground mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
