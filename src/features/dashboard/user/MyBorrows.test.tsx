import { render, screen } from "@/test/utils";
import MyBorrows from "./MyBorrows";
import { describe, it, expect } from "vitest";

describe("MyBorrows", () => {
  it("renders the page header", () => {
    render(<MyBorrows />);
    expect(
      screen.getByRole("heading", { name: "My Borrows" }),
    ).toBeInTheDocument();
  });

  it("renders table skeleton when loading", () => {
    const { container } = render(<MyBorrows />);
    expect(container.querySelector(".rounded-md")).toBeInTheDocument();
  });
});
