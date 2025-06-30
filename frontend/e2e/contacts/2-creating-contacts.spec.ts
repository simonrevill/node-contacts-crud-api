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

  test("User can navigate back to the contacts page from the add contact page", async ({
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

  test("User sees a form to create a new contact with the relevant controls", async ({
    contactsPage,
    page,
  }) => {
    // Arrange
    await contactsPage.goToNewContactForm();
    await page.waitForURL("**/create");

    // Assert
    const firstNameInput = page.getByLabel("First name");
    const lastNameInput = page.getByLabel("Last name");
    const emailInput = page.getByLabel("Email");
    const cancelButton = page.getByRole("button", { name: /Cancel/i });
    const submitButton = page.getByRole("button", { name: /Submit/i });

    await expect(firstNameInput).toBeVisible();
    await expect(lastNameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(cancelButton).toBeVisible();
    await expect(submitButton).toBeVisible();
  });
});
