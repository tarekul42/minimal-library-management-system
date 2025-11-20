import type { BookFormData } from "@/schema/bookSchema";
import type { UseFormReturn } from "react-hook-form";

export interface IInput {
  name: keyof BookFormData;
  label: string;
  defaultValue?: string;
}

export interface IFormFieldConfig {
  name: keyof BookFormData;
  label: string;
  placeholder?: string;
  type: string;
  options?: { value: string; label: string }[];
  min?: number;
}

export interface IBookFormProps {
  form: UseFormReturn<BookFormData>;
  onSubmit: (values: BookFormData) => void | Promise<void>;
  isLoading: boolean;
  submitButtonText: string;
}
