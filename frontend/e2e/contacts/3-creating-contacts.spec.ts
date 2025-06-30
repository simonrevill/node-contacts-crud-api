import { describe, test, expect } from "./add-contact-test";

describe("Creating contacts", () => {
  test("User sees a form to create a new contact with the relevant controls", async ({
    addContactPage,
  }) => {
    // Arrange & Assert
    await expect(addContactPage.firstNameInput).toBeVisible();
    await expect(addContactPage.lastNameInput).toBeVisible();
    await expect(addContactPage.emailInput).toBeVisible();
    await expect(addContactPage.cancelButton).toBeVisible();
    await expect(addContactPage.submitButton).toBeVisible();
  });

  test("User sees a validation error message when they enter a first name that is less than 2 characters in length", async ({
    addContactPage,
    page,
  }) => {
    // Arrange & Act
    await addContactPage.firstNameInput.fill("A");

    // Assert
    await expect(addContactPage.submitButton).toBeDisabled();
    await expect(page.getByRole("alert")).toHaveCount(1);
    await expect(
      page.getByRole("alert", {
        name: "First name requires at least 2 characters.",
      })
    ).toBeVisible();
  });
});
