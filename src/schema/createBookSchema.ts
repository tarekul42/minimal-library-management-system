import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  author: z.string().min(2, "Author must be at least 2 characters"),
  genre: z.string().min(1, "Genre is required"),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  copies: z.number().min(0, "Copies must be at least 0"),
  availability: z.enum(["available", "unavailable"]),
});
