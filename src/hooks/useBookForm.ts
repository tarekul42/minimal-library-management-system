import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, type BookFormData } from "@/schema/bookSchema";
import type { IBook } from "@/types/book";

export const useBookForm = (book?: IBook) => {
  const defaultValues = {
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    isbn: book?.isbn || "",
    description: book?.description || "",
    copies: book?.copies || 0,
    availability: book?.available ? "available" : "unavailable",
  };

  return useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues,
  });
};
