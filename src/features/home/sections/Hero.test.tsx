import { render, screen } from "@/test/utils";
import { Hero } from "./Hero";
import { describe, it, expect } from "vitest";

describe("Hero", () => {
  it("renders hero heading text", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent("Discover your next great read at the Athenaeum");
  });

  it("renders Browse Books CTA link to /books", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /explore library/i });
    expect(link).toHaveAttribute("href", "/books");
  });

  it("renders Become a Member CTA link to /register", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /become a member/i });
    expect(link).toHaveAttribute("href", "/register");
  });
});
