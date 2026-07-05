import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "default" | "tight" | "none";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "default", ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        spacing === "default" && "py-16 md:py-24",
        spacing === "tight" && "py-8 md:py-12",
        spacing === "none" && "",
        className,
      )}
      {...props}
    />
  ),
);
Section.displayName = "Section";
