import { test, expect } from "@playwright/test";

const { describe } = test;

describe("initial page load", () => {
  test("page has correct title", async ({ page }) => {
    // Arrange
    await page.goto("/");

    // Assert
    await expect(page).toHaveTitle(/Contacts/);
  });

  test("page has correct heading", async ({ page }) => {
    // Arrange
    await page.goto("/");

    // Act
    const heading = await page.getByRole("heading", {
      level: 1,
      name: /Contacts/,
    });

    // Assert
    await expect(heading).toBeVisible();
  });
});
