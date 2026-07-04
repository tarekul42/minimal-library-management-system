import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { StatCard } from "./StatCard";
import { BookOpen } from "lucide-react";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total Books" value={42} icon={BookOpen} />);
    expect(screen.getByText("Total Books")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders with numeric value", () => {
    render(<StatCard label="Revenue" value={12345} icon={BookOpen} />);
    expect(screen.getByText("12,345")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(<StatCard label="Books" value={10} icon={BookOpen} />);
    expect(document.querySelector(".lucide-book-open")).toBeInTheDocument();
  });

  it("shows delta indicator when provided", () => {
    render(<StatCard label="Users" value={100} icon={BookOpen} delta={12} deltaLabel="vs last month" />);
    expect(screen.getByText("+12%")).toBeInTheDocument();
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });
});
