import { test, expect } from "@playwright/test";

const DEMO_USER = {
  _id: "1",
  name: "Demo User",
  email: "demo@library.com",
  role: "member" as const,
  isActive: true,
};

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            user: DEMO_USER,
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6Im1lbWJlciJ9.fake",
          },
        }),
      });
    });
  });

  test("login with demo credentials", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("button", { name: "Fill demo credentials" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test("login page redirects authenticated users", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("button", { name: "Fill demo credentials" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    await page.goto("/login");
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test("logout works", async ({ page }) => {
    await page.route("**/api/auth/logout", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });

    await page.goto("/login");

    await page.getByRole("button", { name: "Fill demo credentials" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    const avatarButton = page.getByLabel("Account menu");
    await avatarButton.click();

    const signOutButton = page.getByRole("menuitem", { name: /sign out/i });
    await signOutButton.click();

    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });
});
