import { GENRE_VALUES } from "@/schema/bookSchema";

// Must match backend's GENRES (src/shared/constants.ts)
const LABELS_MAP: Record<string, string> = {
  FICTION: "Fiction",
  NON_FICTION: "Non-Fiction",
  SCIENCE: "Science",
  HISTORY: "History",
  BIOGRAPHY: "Biography",
  FANTASY: "Fantasy",
};

export const GENRE_LABELS = Object.fromEntries(
  GENRE_VALUES.map((g) => [g, LABELS_MAP[g]]),
) as Record<(typeof GENRE_VALUES)[number], string>;

export const GENRE_OPTIONS = GENRE_VALUES.map((value) => ({ value, label: GENRE_LABELS[value] }));
