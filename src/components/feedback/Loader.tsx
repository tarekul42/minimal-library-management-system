import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Loader({ size = 16, className, label }: LoaderProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} role="status">
      <Loader2 className="animate-spin" style={{ width: size, height: size }} />
      {label && <span className="text-sm">{label}</span>}
      <span className="sr-only">Loading</span>
    </span>
  );
}
