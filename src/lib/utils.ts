import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthorName(author: unknown): string {
  if (!author) return "Unknown";
  if (typeof author === "string") return author;
  return (author as { name: string }).name;
}
