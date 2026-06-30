import { Navigate, Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/wishlistApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { ErrorRetry } from "@/components/ui/error-retry";
import { toast } from "sonner";
import { Heart, Trash2, Library, BookOpen } from "lucide-react";
import { GENRE_LABELS } from "@/config/constants";
import type { IWishlistItem } from "@/types/wishlist";

const WishlistPage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError, refetch } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const items: IWishlistItem[] = data?.data || [];

  const handleRemove = async (bookId: string) => {
    try {
      await removeFromWishlist(bookId).unwrap();
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl mb-6 flex items-center gap-2">
        <Heart className="h-6 w-6" />
        My Wishlist
      </h1>

      {isLoading ? (
        <CardSkeleton count={3} />
      ) : isError ? (
        <ErrorRetry message="Failed to load wishlist" onRetry={refetch} />
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Library className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Your wishlist is empty</p>
          <Link to="/books">
            <Button variant="outline" className="mt-4"><BookOpen className="h-4 w-4 mr-2" />Browse Books</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item._id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 space-y-3">
                <Link to={`/books/${item.book._id}`} className="hover:underline">
                  <h3 className="font-semibold truncate">{item.book.title}</h3>
                </Link>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">{GENRE_LABELS[item.book.genre as keyof typeof GENRE_LABELS] || item.book.genre}</Badge>
                  <Badge variant="secondary" className="text-xs">{item.book.availableCopies}/{item.book.copies}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">ISBN: {item.book.isbn}</p>
                <Button variant="outline" size="sm" className="w-full text-red-400 border-red-400/30" onClick={() => handleRemove(item.book._id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
