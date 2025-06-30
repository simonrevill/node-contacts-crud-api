import { describe, test, expect } from "./contacts-test";

describe("Creating contacts", () => {
  test("User can navigate from the no contacts alert on the contacts page to the add contact page", async ({
    contactsPage,
    page,
  }) => {
    // Arrange
    await contactsPage.goto();

    // Act
    await contactsPage.addContactButton.click();
    await page.waitForURL("**/create");

    // Assert
    await expect(
      page.getByRole("heading", { level: 2, name: /Add a contact/i })
    ).toBeVisible();
  });

  test("User can navigate back to the contacts page from the add contact page using the back button", async ({
    contactsPage,
    page,
  }) => {
    // Arrange
    await contactsPage.goToNewContactForm();
    await page.waitForURL("**/create");

    const backButton = await page.getByRole("button", { name: /Back/i });

    // Act
    await backButton.click();
    await page.waitForURL("/");

    // Assert
    await expect(contactsPage.contactListHeading).toBeVisible();
  });

  test("User can navigate back to the contacts page from the add contact page using the cancel button", async ({
    contactsPage,
    page,
  }) => {
    // Arrange
    await contactsPage.goToNewContactForm();
    await page.waitForURL("**/create");

    const backButton = await page.getByRole("button", { name: /Cancel/i });

    // Act
    await backButton.click();
    await page.waitForURL("/");

    // Assert
    await expect(contactsPage.contactListHeading).toBeVisible();
  });
});
