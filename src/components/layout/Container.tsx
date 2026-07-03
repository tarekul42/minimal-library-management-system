import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "page" | "app" | "full";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "page", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        variant === "page" && "container-page",
        variant === "app" && "container-app",
        variant === "full" && "w-full",
        className,
      )}
      {...props}
    />
  ),
);
Container.displayName = "Container";
