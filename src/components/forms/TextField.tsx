import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, required, id, className, ...props }, ref) => {
    const inputId = id || props.name;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    return (
      <div className="space-y-2">
        <Label htmlFor={inputId}>
          {label}
          {required && <span className="ml-0.5 text-destructive" aria-hidden>*</span>}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
          {...props}
        />
        {hint && !error && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
        {error && <p id={errorId} role="alert" className="text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);
TextField.displayName = "TextField";
