import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container><p>Hello</p></Container>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it('applies default variant class "container-page"', () => {
    render(<Container>Content</Container>);
    const div = screen.getByText("Content");
    expect(div.className).toContain("container-page");
  });

  it('applies "container-app" class when variant="app"', () => {
    render(<Container variant="app">Content</Container>);
    const div = screen.getByText("Content");
    expect(div.className).toContain("container-app");
  });

  it('applies "w-full" class when variant="full"', () => {
    render(<Container variant="full">Content</Container>);
    const div = screen.getByText("Content");
    expect(div.className).toContain("w-full");
  });

  it("merges custom className", () => {
    render(<Container className="my-custom">Content</Container>);
    const div = screen.getByText("Content");
    expect(div.className).toContain("my-custom");
  });
});
