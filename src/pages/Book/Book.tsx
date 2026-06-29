import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IBookModalProps } from "@/types/book";
import { GENRE_LABELS } from "@/config/constants";
import { useGetBookQuery } from "@/redux/api/bookApi";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, Hash, Layers, Tag, MapPin } from "lucide-react";

const Book: React.FC<IBookModalProps> = ({ open, onOpenChange, bookId }) => {
  const { data: book, isLoading, isError } = useGetBookQuery(bookId!, { skip: !bookId });
  const bookData = book?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Details</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-4 p-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : isError || !bookData ? (
          <div className="flex justify-center items-center p-8">
            <h1 className="text-3xl">No Book found</h1>
          </div>
        ) : (
          <Card className="w-full mx-auto border-0 shadow-none">
            <CardContent className="px-0 space-y-4">
              {bookData.coverImage && (
                <img
                  src={bookData.coverImage}
                  alt={bookData.title}
                  className="w-full max-h-64 object-contain rounded-lg"
                />
              )}

              <div>
                <h2 className="text-2xl font-bold">{bookData.title}</h2>
                <p className="text-muted-foreground">
                  by{" "}
                  {typeof bookData.author === "string"
                    ? bookData.author
                    : bookData.author?.name}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <Layers className="h-3 w-3 mr-1" />
                  {GENRE_LABELS[bookData.genre] || bookData.genre}
                </Badge>
                {bookData.available ? (
                  <Badge className="bg-green-600">Available ({bookData.availableCopies}/{bookData.copies})</Badge>
                ) : (
                  <Badge variant="destructive">Not Available</Badge>
                )}
                {bookData.avgRating > 0 && (
                  <Badge variant="outline">★ {bookData.avgRating.toFixed(1)}</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span>ISBN: {bookData.isbn}</span>
                </div>
                {bookData.pages && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{bookData.pages} pages</span>
                  </div>
                )}
                {bookData.publisher && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{bookData.publisher}{bookData.publishedYear ? `, ${bookData.publishedYear}` : ""}</span>
                  </div>
                )}
                {bookData.shelfLocation && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Shelf: {bookData.shelfLocation}</span>
                  </div>
                )}
              </div>

              {bookData.description && (
                <div>
                  <h4 className="font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{bookData.description}</p>
                </div>
              )}

              {bookData.tags && bookData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <Tag className="h-4 w-4 text-muted-foreground mr-1" />
                  {bookData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Book;
