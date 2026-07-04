import { render, screen } from "@/test/utils";
import Books from "./Books";
import { describe, it, expect } from "vitest";

describe("Books", () => {
  it("renders the page heading", () => {
    render(<Books />);
    expect(
      screen.getByRole("heading", { name: /explore books/i }),
    ).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Books />);
    expect(screen.getByPlaceholderText("Title, author, tag...")).toBeInTheDocument();
  });

  it("renders filter elements", () => {
    render(<Books />);
    expect(screen.getByText("Genre")).toBeInTheDocument();
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByText("Minimum rating")).toBeInTheDocument();
  });

  it("renders sort options", () => {
    render(<Books />);
    expect(screen.getByText("Title: A to Z")).toBeInTheDocument();
  });
});
