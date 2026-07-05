import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBookMutation, useEditBookMutation, useGetBookQuery } from "@/redux/api/bookApi";
import { bookSchema, type BookFormData } from "@/schema/bookSchema";
import { BookForm } from "@/components/BookForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormSkeleton } from "@/components/ui/form-skeleton";
import { getApiError, splitTags } from "@/lib/utils";
import { toast } from "sonner";
import type { IAuthor } from "@/types/author";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId?: string | null;
  authors: IAuthor[];
}

export function BookFormModal({ open, onOpenChange, bookId, authors }: Props) {
  const isEdit = !!bookId;
  const { data: bookData, isLoading: loadingBook, isError: bookError } = useGetBookQuery(bookId ?? "", { skip: !isEdit || !open });
  const [createBook, { isLoading: creating }] = useCreateBookMutation();
  const [editBook, { isLoading: updating }] = useEditBookMutation();
  const isLoading = creating || updating;

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
    if (!open) {
      form.reset();
      return;
    }
    if (isEdit && bookData?.data) {
      const book = bookData.data;
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
    } else if (!isEdit) {
      form.reset();
    }
  }, [open, bookData, isEdit, form]);

  const onSubmit = async (values: BookFormData) => {
    try {
      const tags = splitTags(values.tags as string | undefined);
      if (isEdit && bookId) {
        await editBook({ bookId, bookData: { ...values, tags } }).unwrap();
        toast.success("Book updated successfully");
      } else {
        await createBook({ ...values, tags }).unwrap();
        toast.success("Book created successfully");
      }
      onOpenChange(false);
    } catch (err) {
      toast.error(getApiError(err, isEdit ? "Failed to update book" : "Failed to create book"));
    }
  };

  const authorOptions = authors.map((a) => ({ value: a._id, label: a.name }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Book" : "Add New Book"}</DialogTitle>
        </DialogHeader>
        {isEdit && loadingBook ? (
          <FormSkeleton />
        ) : isEdit && bookError ? (
          <p className="text-sm text-destructive py-4 text-center">Failed to load book data. Please try again.</p>
        ) : (
          <BookForm form={form} onSubmit={onSubmit} isLoading={isLoading} submitButtonText={isEdit ? "Save Changes" : "Create Book"} authorOptions={authorOptions} />
        )}
      </DialogContent>
    </Dialog>
  );
}
