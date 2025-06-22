import { test, expect } from "@playwright/test";

const { describe, beforeEach } = test;

beforeEach(async ({ page }) => {
  await page.goto("/");
});

describe("initial page load", () => {
  test("page has correct title", async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/Contacts/);
  });

  test("page has correct heading", async ({ page }) => {
    // Act
    const heading = await page.getByRole("heading", {
      level: 1,
      name: /Contacts/,
    });

    // Assert
    await expect(heading).toBeVisible();
  });
});
