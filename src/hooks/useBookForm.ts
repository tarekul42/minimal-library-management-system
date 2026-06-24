import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, type BookFormData } from "@/schema/bookSchema";
import type { IBook } from "@/types/book";

const getAuthorId = (book?: IBook): string => {
  if (!book?.author) return "";
  return typeof book.author === "string" ? book.author : book.author._id;
};

export const useBookForm = (book?: IBook) => {
  const defaultValues: BookFormData = {
    title: book?.title || "",
    author: getAuthorId(book),
    genre: book?.genre || "FICTION",
    isbn: book?.isbn || "",
    description: book?.description || "",
    pages: book?.pages,
    publisher: book?.publisher || "",
    publishedYear: book?.publishedYear,
    copies: book?.copies || 0,
    tags: book?.tags?.join(", ") || "",
    shelfLocation: book?.shelfLocation || "",
  };

  return useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues,
  });
};
