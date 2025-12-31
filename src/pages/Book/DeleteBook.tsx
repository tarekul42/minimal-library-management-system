import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import type { DeleteBookModalProps } from "@/types/deleteBookModalProps";
import { useDeleteBookMutation, useGetBookQuery } from "@/redux/api/bookApi";

const DeleteBook: React.FC<DeleteBookModalProps> = ({
  open,
  onOpenChange,
  bookId,
}) => {
  const [deleteBook, { isLoading: isUpdating }] = useDeleteBookMutation();
  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookQuery(bookId!, { skip: !bookId });
  const bookData = book?.data;

  const handleDelete = async () => {
    try {
      await deleteBook(bookId!).unwrap();
      toast.success("Book deleted successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book!");
    }
  };

  return (
    <>
      {isLoading || isError || !bookData ? null : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
            <DialogHeader>
              <DialogTitle className="text-gray-300">Are you sure?</DialogTitle>
            </DialogHeader>
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
              <CardContent className="px-0 space-y-1">
                <CardTitle className="text-gray-300">
                  Permanently delete the book "{bookData.title}"? This action
                  cannot be undone.
                </CardTitle>
              </CardContent>
              <DialogDescription />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-900 border-gray-600 text-gray-300 cursor-pointer"
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleDelete}
                  className="bg-red-500 text-white font-semibold cursor-pointer"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Deleting...." : "Yes, Delete"}
                </Button>
              </DialogFooter>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DeleteBook;
