import { test, expect } from "@playwright/test";

const MEMBER_USER = {
  _id: "2",
  name: "Jane Member",
  email: "jane@library.com",
  role: "member" as const,
  isActive: true,
};

test.describe("Member dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { user: MEMBER_USER, accessToken: "fake-token" },
        }),
      });
    });

    await page.goto("/login");
    await page.getByRole("button", { name: "Fill demo credentials" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test("member can access dashboard", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain("/dashboard");
  });

  test("member cannot access admin", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL("/", { timeout: 10000 });
  });

  test("sidebar has navigation items", async ({ page }) => {
    const sidebarLinks = ["Overview", "My Borrows", "Reservations", "Wishlist", "Fines", "Notifications", "Profile", "Settings"];

    for (const label of sidebarLinks) {
      const link = page.locator("aside").getByRole("link", { name: label });
      await expect(link).toBeVisible();
    }
  });
});
