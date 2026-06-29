import type { Genre } from "@/types/book";

export const GENRE_LABELS: Record<Genre, string> = {
  FICTION: "Fiction",
  NON_FICTION: "Non-Fiction",
  SCIENCE: "Science",
  HISTORY: "History",
  BIOGRAPHY: "Biography",
  FANTASY: "Fantasy",
};

export const GENRE_OPTIONS = Object.entries(GENRE_LABELS).map(([value, label]) => ({ value, label }));
