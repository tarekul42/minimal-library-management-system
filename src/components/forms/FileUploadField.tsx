import { type ChangeEvent, type ReactNode, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadFieldProps {
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  accept?: string;
  className?: string;
}

export function FileUploadField({
  label, value, onChange, error, hint, required, accept = "image/*", className,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={inputId}>
        {label}
        {required && <span className="ml-0.5 text-destructive" aria-hidden>*</span>}
      </Label>
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          {value ? "Change file" : "Upload file"}
        </Button>
        {value && <span className="text-xs text-muted-foreground truncate max-w-[200px]">{value}</span>}
      </div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
        aria-invalid={!!error}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
      />
      {hint && !error && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
