import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("renders default title and message when no props given", () => {
    render(<ErrorState />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please try again."),
    ).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    render(<ErrorState title="Custom Error" message="Custom message." />);
    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(screen.getByText("Custom message.")).toBeInTheDocument();
  });

  it("renders retry button and calls onRetry when clicked", async () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    const btn = screen.getByRole("button", { name: /try again/i });
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("does NOT render retry button when onRetry is not provided", () => {
    render(<ErrorState />);
    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();
  });
});
