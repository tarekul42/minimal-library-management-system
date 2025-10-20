import type { IValidationMessages } from "@/types/validationMessages";

export const validationMessages: IValidationMessages = {
  quantity: {
    min: "Quantity must be at least 1.",
    max: (count: number) =>
      `Quantity cannot be more than the ${count} available copies.`,
  },
};
