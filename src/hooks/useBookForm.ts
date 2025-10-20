import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookSchema } from "@/schema/createBookSchema";
import { editBookSchema } from "@/schema/editBookSchema";
import type { IBook } from "@/types/book";

type FormType = "create" | "edit";

export const useBookForm = (type: FormType, book?: IBook) => {
  const schema = type === "create" ? createBookSchema : editBookSchema;

  const defaultValues = {
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    isbn: book?.isbn || "",
    description: book?.description || "",
    copies: book?.copies || 0,
    availability: book?.available ? "available" : "unavailable",
  };

  return useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
};
