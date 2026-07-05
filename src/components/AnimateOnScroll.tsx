import { useInView } from "react-intersection-observer";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}

export function AnimateOnScroll({ children, className, as: Tag = "div" }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700",
        inView ? "animate-fade-in-up" : "opacity-0 translate-y-5",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
