import { type ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/Loader";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  loadingLabel?: string;
  label: string;
}

export function SubmitButton({ isSubmitting, loadingLabel = "Saving...", label, disabled, ...props }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isSubmitting || disabled} {...props}>
      {isSubmitting ? <Loader label={loadingLabel} /> : label}
    </Button>
  );
}
