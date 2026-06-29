import type { IValidationMessages } from "@/types/validationMessages";
import z from "zod";

export const borrowBookSchema = (
  availableCopies: number,
  messages: IValidationMessages,
) => {
  return z.object({
    quantity: z
      .number()
      .min(1, { message: messages.quantity.min })
      .max(availableCopies, {
        message: messages.quantity.max(availableCopies),
      }),
    dueDate: z.date(),
  });
};
