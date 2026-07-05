import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("renders label", () => {
    render(<TextField label="Email" name="email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it('shows error message with role="alert" when error prop set', () => {
    render(<TextField label="Email" name="email" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("input has aria-invalid when error is set", () => {
    render(<TextField label="Email" name="email" error="Required" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("input has aria-describedby pointing to error id when error is set", () => {
    render(<TextField label="Email" name="email" error="Required" />);
    const input = screen.getByLabelText("Email") as HTMLElement;
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBe("email-error");
    const errorEl = document.getElementById(describedBy!);
    expect(errorEl).toHaveTextContent("Required");
  });

  it("shows hint text when provided and no error", () => {
    render(<TextField label="Email" name="email" hint="We will never share your email." />);
    expect(screen.getByText("We will never share your email.")).toBeInTheDocument();
  });
});
