import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import { ConfirmationDialog } from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  it("renders title and description when open", () => {
    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={vi.fn()}
        title="Delete book?"
        description="This cannot be undone."
        onConfirm={vi.fn()}
      />,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Delete book?");
    expect(dialog).toHaveTextContent("This cannot be undone.");
  });

  it("does not render content when open is false", () => {
    render(
      <ConfirmationDialog
        open={false}
        onOpenChange={vi.fn()}
        title="Delete book?"
        description="This cannot be undone."
        onConfirm={vi.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onConfirm when confirm button clicked", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={vi.fn()}
        title="Delete?"
        onConfirm={onConfirm}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenChange(false) when cancel button clicked", async () => {
    const onOpenChange = vi.fn();
    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={onOpenChange}
        title="Delete?"
        onConfirm={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
