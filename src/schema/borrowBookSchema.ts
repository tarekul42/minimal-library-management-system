import z from "zod";

export const borrowBookSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1." }),
  dueDate: z.date(),
});
