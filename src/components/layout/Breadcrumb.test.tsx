import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

const items: BreadcrumbItem[] = [
  { label: "Books", href: "/books" },
  { label: "Fiction", href: "/books/fiction" },
  { label: "Current" },
];

describe("Breadcrumb", () => {
  it("renders all items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("last item is not a link", () => {
    render(<Breadcrumb items={items} />);
    const lastItem = screen.getByText("Current");
    expect(lastItem.tagName).toBe("SPAN");
  });

  it("non-last items with href are links", () => {
    render(<Breadcrumb items={items} />);
    const booksLink = screen.getByText("Books");
    const fictionLink = screen.getByText("Fiction");
    expect(booksLink.tagName).toBe("A");
    expect(booksLink.closest("a")).toHaveAttribute("href", "/books");
    expect(fictionLink.tagName).toBe("A");
    expect(fictionLink.closest("a")).toHaveAttribute("href", "/books/fiction");
  });

  it('has aria-label="Breadcrumb"', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
  });

  it("renders home icon link", () => {
    render(<Breadcrumb items={items} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/");
  });
});
