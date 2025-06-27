import { describe, beforeEach, test, expect } from "./contacts-test";

beforeEach(async ({ contactsPage }) => {
  await contactsPage.goto();
});

describe("Initial load of the application", () => {
  test("User sees the correct page title when the application loads", async ({
    contactsPage,
  }) => {
    // Arrange & Assert
    expect(await contactsPage.getTitle()).toBe("Contacts Manager");
  });

  test("User sees the correct heading when the application loads", async ({
    contactsPage,
  }) => {
    // Arrange & Assert
    await expect(contactsPage.heading).toBeVisible();
  });

  test("User sees error message when the application fails to load data", async ({
    contactsPage,
    page,
  }) => {
    // Arrange
    await page.route("http://localhost:8080/api/contacts", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          status: 500,
          error: "Something went wrong.",
        }),
      });
    });
    // Assert
    await expect(contactsPage.fetchErrorMessageHeading).toBeVisible();
    await expect(contactsPage.fetchErrorMessageSubheading).toBeVisible();
  });

  test("User sees an empty contact list when the application loads successfully", async ({
    contactsPage,
  }) => {
    // Arrange & Assert
    await expect(contactsPage.emptyStateHeading).toBeVisible();
    await expect(contactsPage.emptyStateSubheading).toBeVisible();
    await expect(contactsPage.emptyStateAddContactButton).toBeVisible();
  });
});
