import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IReview } from "@/types/review";

interface ReviewCardProps {
  review: IReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex gap-4 rounded-lg border border-border p-4">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage src={review.user.avatar} alt={review.user.name} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{review.user.name}</p>
          <span className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < review.rating
                  ? "fill-accent text-accent"
                  : "fill-none text-muted-foreground"
              }`}
            />
          ))}
        </div>
        {review.comment && (
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        )}
      </div>
    </div>
  );
}
