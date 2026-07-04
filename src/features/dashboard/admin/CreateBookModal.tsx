import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { bookSchema, type BookFormData } from "@/schema/bookSchema";
import { BookForm } from "@/components/BookForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import type { IAuthor } from "@/types/author";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authors: IAuthor[];
}

export function CreateBookModal({ open, onOpenChange, authors }: Props) {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "", author: "", genre: "FICTION", isbn: "",
      description: "", coverImage: "", pages: undefined,
      publisher: "", publishedYear: undefined, copies: 1,
      tags: "", shelfLocation: "",
    },
  });

  const onSubmit = async (values: BookFormData) => {
    try {
      const tags = typeof values.tags === "string"
        ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      await createBook({ ...values, tags }).unwrap();
      toast.success("Book created successfully");
      onOpenChange(false);
      form.reset();
    } catch (err) {
      toast.error(getApiError(err, "Failed to create book"));
    }
  };

  const authorOptions = authors.map((a) => ({ value: a._id, label: a.name }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <BookForm form={form} onSubmit={onSubmit} isLoading={isLoading} submitButtonText="Create Book" authorOptions={authorOptions} />
      </DialogContent>
    </Dialog>
  );
}
