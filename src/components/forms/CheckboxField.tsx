import { type InputHTMLAttributes, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  hint?: ReactNode;
}

export function CheckboxField({ label, error, hint, id, className, ...props }: CheckboxFieldProps) {
  const inputId = id || props.name;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <input
          id={inputId}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            "mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary",
            error && "border-destructive",
            className,
          )}
          {...props}
        />
        <Label htmlFor={inputId} className="text-sm font-normal">{label}</Label>
      </div>
      {hint && !error && <p id={hintId} className="text-xs text-muted-foreground pl-6">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs text-destructive pl-6">{error}</p>}
    </div>
  );
}
