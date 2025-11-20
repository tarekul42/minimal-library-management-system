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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { IBookModalProps } from "@/types/book";
import { useGetBookQuery } from "@/redux/api/bookApi";

const Book: React.FC<IBookModalProps> = ({ open, onOpenChange, bookId }) => {
  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookQuery(bookId!, { skip: !bookId });

  const bookData = book?.data;
  const { title, author, genre, isbn, description, copies, available } =
    bookData ?? {};

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
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
            <div className="flex justify-center items-center h-[100vh]">
              <h1 className="text-3xl">No Book found</h1>
            </div>
          ) : (
            <Card className="w-full mx-auto border-0 shadow-none">
              <CardContent className="px-0 space-y-2">
                <CardTitle>Title: {title}</CardTitle>
                <CardTitle>
                  Author:{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {author}
                  </span>
                </CardTitle>
                <CardTitle>
                  Genre:{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {genre}
                  </span>
                </CardTitle>
                <CardTitle>
                  ISBN:{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {isbn}
                  </span>
                </CardTitle>
                <CardTitle>
                  Description:{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {description}
                  </span>
                </CardTitle>
                <CardTitle>
                  Copies:{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {copies}
                  </span>
                </CardTitle>
                <CardTitle>
                  Availablity:{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {available ? "Available" : "Not Available"}
                  </span>
                </CardTitle>
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
    </>
  );
};

export default Book;
