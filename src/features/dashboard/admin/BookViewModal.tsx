import { useGetBookQuery } from "@/redux/api/bookApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { GENRE_LABELS } from "@/config/constants";
import { getAuthorName } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string;
}

export function BookViewModal({ open, onOpenChange, bookId }: Props) {
  const { data, isLoading } = useGetBookQuery(bookId, { skip: !open });
  const book = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isLoading ? "Loading..." : book?.title}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : book ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              {book.coverImage && (
                <img src={book.coverImage} alt={book.title} className="h-36 w-28 rounded object-cover" />
              )}
              <div className="space-y-2 text-sm flex-1">
                <div><span className="font-medium">Author:</span> {getAuthorName(book.author)}</div>
                <div><span className="font-medium">ISBN:</span> {book.isbn}</div>
                <div><span className="font-medium">Genre:</span> <Badge variant="outline">{GENRE_LABELS[book.genre]}</Badge></div>
                <div><span className="font-medium">Copies:</span> {book.availableCopies}/{book.copies} available</div>
                <div><span className="font-medium">Rating:</span> {book.avgRating.toFixed(1)} ({book.reviewCount} reviews)</div>
                {book.publisher && <div><span className="font-medium">Publisher:</span> {book.publisher}</div>}
                {book.publishedYear && <div><span className="font-medium">Published:</span> {book.publishedYear}</div>}
                {book.pages && <div><span className="font-medium">Pages:</span> {book.pages}</div>}
                {book.shelfLocation && <div><span className="font-medium">Shelf:</span> {book.shelfLocation}</div>}
              </div>
            </div>
            {book.description && (
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{book.description}</p>
              </div>
            )}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {book.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Book not found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
