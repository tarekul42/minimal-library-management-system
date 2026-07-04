import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetBookQuery, useEditBookMutation } from "@/redux/api/bookApi";
import { bookSchema, type BookFormData } from "@/schema/bookSchema";
import { BookForm } from "@/components/BookForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormSkeleton } from "@/components/ui/form-skeleton";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import type { IAuthor } from "@/types/author";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string;
  authors: IAuthor[];
}

export function EditBookModal({ open, onOpenChange, bookId, authors }: Props) {
  const { data: bookData, isLoading: loadingBook } = useGetBookQuery(bookId, { skip: !open });
  const [editBook, { isLoading }] = useEditBookMutation();
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "", author: "", genre: "FICTION", isbn: "",
      description: "", coverImage: "", pages: undefined,
      publisher: "", publishedYear: undefined, copies: 1,
      tags: "", shelfLocation: "",
    },
  });

  useEffect(() => {
    const book = bookData?.data;
    if (book) {
      form.reset({
        title: book.title,
        author: typeof book.author === "string" ? book.author : book.author._id,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description ?? "",
        coverImage: book.coverImage ?? "",
        pages: book.pages,
        publisher: book.publisher ?? "",
        publishedYear: book.publishedYear,
        copies: book.copies,
        tags: (book.tags ?? []).join(", "),
        shelfLocation: book.shelfLocation ?? "",
      });
    }
  }, [bookData, form]);

  const onSubmit = async (values: BookFormData) => {
    try {
      const tags = typeof values.tags === "string"
        ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      await editBook({ bookId, bookData: { ...values, tags } }).unwrap();
      toast.success("Book updated successfully");
      onOpenChange(false);
    } catch (err) {
      toast.error(getApiError(err, "Failed to update book"));
    }
  };

  const authorOptions = authors.map((a) => ({ value: a._id, label: a.name }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        {loadingBook ? (
          <FormSkeleton />
        ) : (
          <BookForm form={form} onSubmit={onSubmit} isLoading={isLoading} submitButtonText="Save Changes" authorOptions={authorOptions} />
        )}
      </DialogContent>
    </Dialog>
  );
}
