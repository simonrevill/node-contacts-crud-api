import { test, expect } from "@playwright/test";

const { describe, beforeEach } = test;

beforeEach(async ({ page }) => {
  await page.goto("/");
});

describe("initial page load", () => {
  test("page has correct title", async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/Contact Manager/);
  });

  test("page has correct heading", async ({ page }) => {
    // Act
    const header = page.getByRole("banner");
    const heading = header.getByRole("heading", {
      level: 1,
      name: /Contact Manager/,
    });

    // Assert
    expect(heading).toBeVisible();
  });
});
