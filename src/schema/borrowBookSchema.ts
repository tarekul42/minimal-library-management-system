import type { IValidationMessages } from "@/types/validationMessages";
import z from "zod";

// Define a type for the schema creation function
export type BorrowBookSchemaCreator = (
  availableCopies: number,
  messages: IValidationMessages,
) => z.ZodType<{ quantity: number; dueDate: Date }>;

export const borrowBookSchema: BorrowBookSchemaCreator = (
  availableCopies,
  messages,
) => {
  return z
    .object({
      quantity: z.coerce
        .number()
        .min(1, { message: messages.quantity.min })
        .max(availableCopies, {
          message: messages.quantity.max(availableCopies),
        }),
      dueDate: z.date(),
    })
    .refine((data) => data.quantity <= availableCopies, {
      message: messages.quantity.max(availableCopies),
      path: ["quantity"],
    });
};
