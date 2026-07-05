import { test, expect } from "@playwright/test";

test.describe("Book detail page", () => {
  test("detail page renders", async ({ page }) => {
    await page.goto("/books");

    await page.waitForTimeout(1500);

    const bookLink = page.locator("a").filter({ hasText: "View Details" }).first();
    await expect(bookLink).toBeVisible({ timeout: 10000 });

    await bookLink.click();

    await expect(page).toHaveURL(/\/books\//);

    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test("tabs work", async ({ page }) => {
    await page.goto("/books");

    await page.waitForTimeout(1500);

    const bookLink = page.locator("a").filter({ hasText: "View Details" }).first();
    await expect(bookLink).toBeVisible({ timeout: 10000 });
    await bookLink.click();

    await expect(page).toHaveURL(/\/books\//);

    const specTab = page.getByRole("tab", { name: /specifications/i });
    await expect(specTab).toBeVisible({ timeout: 10000 });

    await specTab.click();
    await expect(page.getByText("ISBN")).toBeVisible();

    const reviewsTab = page.getByRole("tab", { name: /reviews/i });
    await reviewsTab.click();
    await expect(page.getByText(/reviews/i)).toBeVisible();
  });

  test("related books section exists", async ({ page }) => {
    await page.goto("/books");

    await page.waitForTimeout(1500);

    const bookLink = page.locator("a").filter({ hasText: "View Details" }).first();
    await expect(bookLink).toBeVisible({ timeout: 10000 });
    await bookLink.click();

    await expect(page).toHaveURL(/\/books\//);

    const related = page.getByText("You might also like");
    await expect(related).toBeVisible({ timeout: 10000 });
  });
});
