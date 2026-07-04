import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@/test/utils";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("debounces value changes by delay ms", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 100 } },
    );

    expect(result.current).toBe("a");

    rerender({ value: "b", delay: 100 });
    expect(result.current).toBe("a");

    await waitFor(() => expect(result.current).toBe("b"), { timeout: 300 });
  });

  it("uses default 300ms delay when not specified", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: "first" } },
    );

    expect(result.current).toBe("first");

    rerender({ value: "second" });
    expect(result.current).toBe("first");

    await waitFor(() => expect(result.current).toBe("second"), { timeout: 500 });
  });
});
