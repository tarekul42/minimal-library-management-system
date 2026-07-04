import { render, screen } from "@/test/utils";
import Login from "./Login";
import { describe, it, expect } from "vitest";

describe("Login", () => {
  it("renders email and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("renders sign in button", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("has a link to the register page", () => {
    render(<Login />);
    const link = screen.getByRole("link", { name: /sign up/i });
    expect(link).toHaveAttribute("href", "/register");
  });

  it("has a link to the forgot password page", () => {
    render(<Login />);
    const link = screen.getByRole("link", { name: /forgot password/i });
    expect(link).toHaveAttribute("href", "/forgot-password");
  });

  it("does not render the demo credentials button when env var is unset", () => {
    render(<Login />);
    expect(
      screen.queryByRole("button", { name: /fill demo credentials/i }),
    ).not.toBeInTheDocument();
  });
});
