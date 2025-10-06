// Detailed view of a single book’s information.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBookQuery } from "@/redux/api/baseApi";

interface BookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string | null;
}

const Book: React.FC<BookModalProps> = ({ open, onOpenChange, bookId }) => {
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
            <DialogTitle className="text-gray-300">Book Details</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-[100vh]">
              <div className="spinner"></div>
            </div>
          ) : isError || !bookData ? (
            <div className="flex justify-center items-center h-[100vh]">
              <h1 className="text-3xl">No Book found</h1>
            </div>
          ) : (
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
              <CardHeader>
                <img
                  className="rounded-xl"
                  src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                  alt={`${title} Book Cover`}
                />
              </CardHeader>
              <CardContent className="px-0 space-y-1">
                <CardTitle className="text-gray-300">Title: {title}</CardTitle>
                <CardTitle>
                  Author:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {author}
                  </span>
                </CardTitle>
                <CardTitle>
                  Genre:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {genre}
                  </span>
                </CardTitle>
                <CardTitle>
                  ISBN:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {isbn}
                  </span>
                </CardTitle>
                <CardTitle>
                  Description:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {description}
                  </span>
                </CardTitle>
                <CardTitle>
                  Copies:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {copies}
                  </span>
                </CardTitle>
                <CardTitle>
                  Availablity:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {available ? "Available" : "Not Available"}
                  </span>
                </CardTitle>
              </CardContent>
            </Card>
          )}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="bg-gray-400">
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
