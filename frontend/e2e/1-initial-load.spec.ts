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

  test("User sees error message when the application fails to load data", async ({
    page,
  }) => {
    // Arrange
    const errorMessageHeading = page.getByText("Something went wrong.");
    const errorMessageSubheading = page.getByText("Please try again later");

    // Assert
    await expect(errorMessageHeading).toBeVisible();
    await expect(errorMessageSubheading).toBeVisible();
  });

  test("User sees an empty contact list when the application loads successfully", async ({
    page,
  }) => {
    // Arrange
    const errorMessageHeading = page.getByText("No contacts");
    const errorMessageSubheading = page.getByText(
      "Add a contact to get started"
    );
    const addContactButton = page.getByRole("button", { name: "Add contact" });

    // Assert
    await expect(errorMessageHeading).toBeVisible();
    await expect(errorMessageSubheading).toBeVisible();
    await expect(addContactButton).toBeVisible();
  });
});
