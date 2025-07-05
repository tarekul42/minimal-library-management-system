import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

interface IProps {
  children: ReactNode;
  className?: string;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function MLMSForm({ children, onSubmit, className }: IProps) {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
