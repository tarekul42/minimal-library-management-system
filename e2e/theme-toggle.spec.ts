import { test, expect } from "@playwright/test";

test.describe("Theme toggle", () => {
  test("toggle theme changes html class", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    const initialClass = await html.getAttribute("class");

    const toggle = page.getByLabel("Toggle theme");
    await toggle.click();

    const newClass = await html.getAttribute("class");
    expect(newClass).not.toBe(initialClass);

    const isLight = newClass?.includes("light");
    const isDark = newClass?.includes("dark");
    expect(isLight || isDark).toBe(true);
  });
});
