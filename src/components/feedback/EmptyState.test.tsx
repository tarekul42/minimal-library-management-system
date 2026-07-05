import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { EmptyState } from "./EmptyState";
import { Search } from "lucide-react";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No results found" />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="Empty" description="Nothing to show." />);
    expect(screen.getByText("Nothing to show.")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("renders action element when provided", () => {
    render(<EmptyState title="Empty" action={<button>Add Item</button>} />);
    expect(screen.getByRole("button", { name: /add item/i })).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    render(<EmptyState title="Empty" icon={Search} />);
    expect(document.querySelector(".lucide-search")).toBeInTheDocument();
  });
});
