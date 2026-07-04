import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility audit", () => {
  const pages = [
    { path: "/", name: "home" },
    { path: "/books", name: "books explore" },
    { path: "/login", name: "login" },
    { path: "/register", name: "register" },
  ];

  for (const { path, name } of pages) {
    test(`${name} page has no critical a11y violations`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual([]);
    });
  }
});
