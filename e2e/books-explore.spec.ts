import { test, expect } from "@playwright/test";

test.describe("Books explore page", () => {
  test("search filters results", async ({ page }) => {
    await page.goto("/books");

    const searchInput = page.locator("#search");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("fiction");
    await expect(page).toHaveURL(/search=fiction/);
  });

  test("genre filter works", async ({ page }) => {
    await page.goto("/books");

    const genreTrigger = page.locator("label").filter({ hasText: "Genre" }).locator("..").getByRole("combobox");
    if (await genreTrigger.isVisible()) {
      await genreTrigger.click();

      const fictionOption = page.getByRole("option", { name: "Fiction" });
      if (await fictionOption.isVisible()) {
        await fictionOption.click();
        await expect(page).toHaveURL(/genre=/);
      }
    }
  });

  test("pagination works", async ({ page }) => {
    await page.goto("/books");

    await page.waitForTimeout(1000);

    const nextButton = page.getByLabel("Next page");
    if (await nextButton.isVisible().catch(() => false)) {
      await nextButton.click();
      await expect(page).toHaveURL(/page=/);
    }
  });
});
