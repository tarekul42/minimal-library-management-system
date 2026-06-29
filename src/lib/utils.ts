import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthorName(author: unknown): string {
  if (!author) return "Unknown";
  if (typeof author === "string") return author;
  if (typeof author === "object" && author !== null && "name" in author) {
    return (author as { name: string }).name;
  }
  return "Unknown";
}

export function getApiError(err: unknown): string {
  const data = (err as { data?: { message?: string } })?.data;
  return data?.message ?? "An unexpected error occurred";
}

export function splitTags(tags: string | undefined): string[] {
  return tags
    ? tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
}
