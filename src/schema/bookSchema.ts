import { z } from "zod";

const genreSchema = z.enum([
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
]);

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  author: z.string().min(1, "Author is required"),
  genre: genreSchema,
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().max(2000).optional(),
  coverImage: z.string().optional(),
  pages: z.number().int().positive().optional(),
  publisher: z.string().max(200).optional(),
  publishedYear: z.number().int().min(1000).max(2030).optional(),
  copies: z.number().int().min(0, "Copies must be at least 0"),
  tags: z.string().optional(),
  shelfLocation: z.string().optional(),
});

export type BookFormData = z.infer<typeof bookSchema>;
