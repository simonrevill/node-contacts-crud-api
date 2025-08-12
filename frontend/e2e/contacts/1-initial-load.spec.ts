import { describe, test, expect } from "./contacts-test";

describe("Initial load of the application", () => {
  test("User sees the correct page title when the application loads", async ({
    contactsPage,
  }) => {
    // Arrange & Assert
    expect(await contactsPage.getTitle()).toBe("Contacts Manager");
  });

  test("User sees the correct headings when the application loads", async ({
    contactsPage,
  }) => {
    // Arrange & Assert
    await expect(contactsPage.heading).toBeVisible();
    await expect(contactsPage.contactListHeading).toBeVisible();
  });

  test("User sees a loading text when the application loads", async ({
    contactsPage,
    page,
  }) => {
    // Arrange & Act
    await contactsPage.simulateFetchingEmptyContactList();
    await contactsPage.goto();

    // Assert
    await page.waitForSelector('[role="status"]', {
      timeout: 2000,
    });
    const loadingMessage = page.getByRole("status");
    expect(loadingMessage).toBeVisible();
    expect(loadingMessage).toContainText("Fetching contacts...");
  });

  test("User sees error message when the application fails to load data", async ({
    contactsPage,
  }) => {
    // Arrange
    await contactsPage.simulateServerError();

    await contactsPage.goto();

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
    await expect(contactsPage.addContactButton).toBeVisible();
  });
});
