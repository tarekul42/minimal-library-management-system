import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { BookCard } from "./BookCard";
import type { IBook } from "@/types/book";

const mockBook: IBook = {
  _id: "123",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "FICTION",
  isbn: "9780743273565",
  description: "A story of the jazz age.",
  copies: 5,
  availableCopies: 3,
  tags: ["classic", "american"],
  avgRating: 4.2,
  reviewCount: 150,
  available: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

describe("BookCard", () => {
  it("renders title, author name, rating, and genre badge", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("by F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("4.2")).toBeInTheDocument();
    expect(screen.getByText("Fiction")).toBeInTheDocument();
  });

  it('renders "View Details" link that goes to /books/:id', () => {
    render(<BookCard book={mockBook} />);
    const link = screen.getByRole("link", { name: /view details/i });
    expect(link).toHaveAttribute("href", "/books/123");
  });

  it("uses placeholder image when no coverImage", () => {
    const bookWithoutCover = { ...mockBook, coverImage: undefined };
    render(<BookCard book={bookWithoutCover} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/images/book-placeholder.svg");
  });
});
