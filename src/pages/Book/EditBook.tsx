import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { IEditBookModalProps } from "@/types/editBook";
import { useEditBookMutation, useGetBookQuery } from "@/redux/api/bookApi";
import { useGetAuthorsQuery } from "@/redux/api/authorApi";
import { useBookForm } from "@/hooks/useBookForm";
import type { BookFormData } from "@/schema/bookSchema";
import { FormContainer } from "@/components/FormContainer";
import { BookForm } from "@/components/BookForm";
import { Skeleton } from "@/components/ui/skeleton";
import { splitTags } from "@/lib/utils";

const EditBook: React.FC<IEditBookModalProps> = ({
  open,
  onOpenChange,
  bookId,
}) => {
  const { data: book, isLoading, isError } = useGetBookQuery(bookId!, {
    skip: !bookId,
  });
  const { data: authorsData } = useGetAuthorsQuery();
  const [editBook, { isLoading: isUpdating }] = useEditBookMutation();
  const bookData = book?.data;
  const authors = authorsData?.data || [];
  const authorOptions = authors.map((a) => ({ value: a._id, label: a.name }));
  const form = useBookForm(bookData);

  const onSubmit = async (values: BookFormData) => {
    try {
      const updateData = {
        ...values,
        tags: splitTags(values.tags),
      };
      await editBook({ bookId: bookId!, bookData: updateData }).unwrap();
      form.reset();
      toast.success("Book updated successfully!");
      onOpenChange(false);
    } catch (err) {
      console.error("Error updating book:", err);
      toast.error("Error updating book!");
    }
  };

  return (
    <>
      {isLoading ? (
        <FormContainer
          type="dialog"
          title="Loading Book Details..."
          open={open}
          onOpenChange={onOpenChange}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </FormContainer>
      ) : isError || !bookData ? null : (
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
            authorOptions={authorOptions}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isUpdating}>
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
