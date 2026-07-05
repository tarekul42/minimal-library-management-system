import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { SubmitButton } from "./SubmitButton";

describe("SubmitButton", () => {
  it("renders label text", () => {
    render(<SubmitButton label="Sign Up" />);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("shows Loader when isSubmitting is true", () => {
    render(<SubmitButton label="Save" isSubmitting />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Saving...")).toBeInTheDocument();
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });

  it("button is disabled when isSubmitting is true", () => {
    render(<SubmitButton label="Save" isSubmitting />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("button is disabled when disabled prop is true", () => {
    render(<SubmitButton label="Save" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
