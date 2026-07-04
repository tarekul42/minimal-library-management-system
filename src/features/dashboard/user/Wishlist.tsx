import { useState } from "react";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/wishlistApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router";
import { Heart, Trash2 } from "lucide-react";
import type { IWishlistItem } from "@/types/wishlist";
import { Seo } from "@/components/Seo";

export default function Wishlist() {
  const [removeTarget, setRemoveTarget] = useState<IWishlistItem | null>(null);
  const { data, isLoading, isError, refetch } = useGetWishlistQuery();
  const [removeFromWishlist, { isLoading: removing }] = useRemoveFromWishlistMutation();

  const items: IWishlistItem[] = data?.data ?? [];

  const handleRemove = async () => {
    if (!removeTarget) return;
    try {
      await removeFromWishlist(removeTarget.book._id).unwrap();
      toast.success("Removed from wishlist");
      setRemoveTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to remove from wishlist"));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Wishlist" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-0"><CardContent className="p-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-4 w-3/4 mt-3" /><Skeleton className="h-3 w-1/2 mt-2" /></CardContent></Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <ErrorState message="Failed to load wishlist" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Seo title="Wishlist" description="View and manage your saved books." />
      <PageHeader title="My Wishlist" description="Books you've saved for later." />

      {items.length === 0 ? (
        <EmptyState icon={Heart} title="Your wishlist is empty" description="Browse books and add them to your wishlist." action={<Button asChild><Link to="/books">Browse books</Link></Button>} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card key={item._id} className="group p-0">
              <CardContent className="p-4">
                <div className="aspect-[3/4] bg-muted rounded-md mb-3 overflow-hidden">
                  {item.book.coverImage ? (
                    <img src={item.book.coverImage} alt={item.book.title} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">No cover</div>
                  )}
                </div>
                <Link to={`/books/${item.book._id}`} className="font-medium text-sm hover:underline line-clamp-2">{item.book.title}</Link>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{item.book.genre?.toLowerCase().replace(/_/g, " ")}</p>
                <Button variant="ghost" size="sm" className="mt-2 w-full text-destructive" onClick={() => setRemoveTarget(item)}>
                  <Trash2 className="mr-2 h-3 w-3" /> Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={!!removeTarget}
        onOpenChange={(o) => !o && setRemoveTarget(null)}
        title="Remove from wishlist?"
        description={`Remove "${removeTarget?.book?.title}" from your wishlist?`}
        confirmLabel="Remove"
        destructive
        onConfirm={handleRemove}
        loading={removing}
      />
    </div>
  );
}
