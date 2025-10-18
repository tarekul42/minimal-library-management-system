import z from "zod";

export const editBookSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  genre: z.string().min(1, { message: "Genre is required." }),
  isbn: z.string().min(1, { message: "ISBN is required." }),
  description: z.string().optional(),
  copies: z
    .number({ invalid_type_error: "Copies must be a number." })
    .int()
    .min(0, { message: "Copies cannot be negative." }),
  available: z.string(),
});
