import { useState } from "react";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star, MessageSquare } from "lucide-react";
import type { IReview } from "@/types/review";

interface ReviewSectionProps {
  bookId: string;
  reviews: IReview[];
}

const ReviewSection = ({ bookId, reviews }: ReviewSectionProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [createReview] = useCreateReviewMutation();

  const handleSubmitReview = async () => {
    if (!user) { toast.error("Sign in to review"); return; }
    try {
      await createReview({ bookId, body: { rating, comment: comment || undefined } }).unwrap();
      toast.success("Review submitted");
      setComment("");
      setRating(5);
    } catch {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="border-t border-gray-800 pt-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Reviews ({reviews.length})
      </h2>

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
  );
};

export default ReviewSection;
