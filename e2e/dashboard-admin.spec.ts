import { test, expect } from "@playwright/test";

const ADMIN_USER = {
  _id: "3",
  name: "Admin User",
  email: "admin@library.com",
  role: "admin" as const,
  isActive: true,
};

test.describe("Admin dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { user: ADMIN_USER, accessToken: "fake-token" },
        }),
      });
    });

    await page.goto("/login");
    await page.getByRole("button", { name: "Fill demo credentials" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/admin/, { timeout: 10000 });
  });

  test("admin can access admin dashboard", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain("/admin");
  });

  test("admin sidebar has management items", async ({ page }) => {
    const sidebarLinks = ["Overview", "Analytics", "Manage Books", "Manage Authors", "Categories", "Borrows", "Fines", "Reports", "Settings", "Manage Users"];

    for (const label of sidebarLinks) {
      const link = page.locator("aside").getByRole("link", { name: label });
      await expect(link).toBeVisible();
    }
  });
});
