import { type ReactNode, type FormEvent } from "react";
import { cn } from "@/lib/utils";

interface FormRootProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
  isSubmitting?: boolean;
  isSuccess?: boolean;
}

export function FormRoot({ onSubmit, children, className, isSubmitting, isSuccess }: FormRootProps) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-6", className)} noValidate>
      {children}
      {isSuccess && (
        <div role="status" className="rounded-md border border-secondary/30 bg-secondary/5 p-3 text-sm text-secondary">
          Saved successfully.
        </div>
      )}
      <input type="submit" hidden aria-hidden disabled={isSubmitting} tabIndex={-1} />
    </form>
  );
}
