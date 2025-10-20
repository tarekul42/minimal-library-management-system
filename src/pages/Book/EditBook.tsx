import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { IEditBookModalProps } from "@/types/editBook";
import { useEditBookMutation, useGetBookQuery } from "@/redux/api/bookApi";
import { useBookForm } from "@/hooks/useBookForm";
import type { BookFormData } from "@/schema/bookSchema";
import { FormContainer } from "@/components/FormContainer";
import { BookForm } from "@/components/BookForm";

const EditBook: React.FC<IEditBookModalProps> = ({
  open,
  onOpenChange,
  bookId,
}) => {
  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookQuery(bookId!, { skip: !bookId });
  const [editBook, { isLoading: isUpdating }] = useEditBookMutation();
  const bookData = book?.data;
  const form = useBookForm(bookData);

  const onSubmit = async (values: BookFormData) => {
    try {
      const updateData = {
        ...values,
        available: values.availability === "available",
        genre: bookData.genre,
      };

      await editBook({ bookId: bookId!, bookData: updateData }).unwrap();
      form.reset();
      toast.success("Book updated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Error updating book!");
    }
  };

  return (
    <>
      {isLoading || isError || !bookData ? null : (
        <FormContainer
          type="dialog"
          title={`Edit Book: ${bookData.title}`}
          open={open}
          onOpenChange={onOpenChange}
        >
          <BookForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isUpdating}
            submitButtonText="Save Changes"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-gray-900 border-gray-600 text-gray-300 cursor-pointer"
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </FormContainer>
      )}
    </>
  );
};

export default EditBook;
