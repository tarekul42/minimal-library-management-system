import { type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SwitchFieldProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
  hint?: ReactNode;
  id?: string;
}

export function SwitchField({ label, checked, onCheckedChange, error, hint, id }: SwitchFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Switch id={inputId} checked={checked} onCheckedChange={onCheckedChange} aria-invalid={!!error} />
        <Label htmlFor={inputId} className="text-sm font-normal">{label}</Label>
      </div>
      {hint && !error && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
