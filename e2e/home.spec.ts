import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("home page renders all sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("great read");

    const statsBar = page.locator("section").filter({ hasText: "Books in catalog" });
    await expect(statsBar).toBeVisible();

    const featured = page.locator("section").filter({ hasText: "Top-rated books" });
    await expect(featured).toBeVisible();

    const categories = page.locator("section").filter({ hasText: "Explore by category" });
    await expect(categories).toBeVisible();

    const faq = page.locator("section").filter({ hasText: "Frequently asked questions" });
    await expect(faq).toBeVisible();
  });

  test("hero CTAs navigate", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /explore library/i }).click();
    await expect(page).toHaveURL(/\/books/);

    await page.goBack();

    await page.getByRole("link", { name: /become a member/i }).click();
    await expect(page).toHaveURL(/\/register/);
  });

  test("FAQ accordion expands", async ({ page }) => {
    await page.goto("/");

    const firstQuestion = page.locator("section").filter({ hasText: "Frequently asked questions" }).getByRole("button").first();
    await firstQuestion.click();

    const accordionContent = page.locator("[data-state='open']");
    await expect(accordionContent).toBeVisible();
  });
});
