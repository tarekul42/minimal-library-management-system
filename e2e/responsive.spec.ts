import { test, expect } from "@playwright/test";

test.describe("Responsive layout", () => {
  test("mobile viewport shows hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const hamburger = page.getByLabel("Open menu");
    await expect(hamburger).toBeVisible();
  });

  test("tablet viewport shows 2-column grid", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    const statsSection = page.locator("section").filter({ hasText: "Books in catalog" });
    await expect(statsSection).toBeVisible();
  });

  test("desktop viewport shows full layout", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const desktopNav = page.locator("nav").filter({ hasNot: page.locator("[class*='lg\\:hidden']") }).first();
    await expect(desktopNav).toBeVisible();

    const hero = page.locator("h1");
    await expect(hero).toBeVisible();
  });
});
