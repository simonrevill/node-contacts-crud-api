import { test, expect } from "@playwright/test";

const { describe, beforeEach } = test;

beforeEach(async ({ page }) => {
  await page.goto("/");
});

describe("Initial load of the application", () => {
  test("User sees the correct page title when the application loads", async ({
    page,
  }) => {
    // Assert
    await expect(page).toHaveTitle(/Contact Manager/);
  });

  test("User sees the correct heading when the application loads", async ({
    page,
  }) => {
    // Arrange
    const header = page.getByRole("banner");
    const heading = header.getByRole("heading", {
      level: 1,
      name: /Contact Manager/,
    });

    // Assert
    await expect(heading).toBeVisible();
  });
});
