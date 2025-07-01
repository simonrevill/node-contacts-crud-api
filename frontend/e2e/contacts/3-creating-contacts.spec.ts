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

  (
    [
      {
        field: "First name",
        input: "firstNameInput",
        message: "First name is required.",
      },
      {
        field: "Last name",
        input: "lastNameInput",
        message: "Last name is required.",
      },
      {
        field: "Email",
        input: "emailInput",
        message: "Email is required.",
      },
    ] as const
  ).forEach(({ field, input, message }) => {
    test(`User sees a required validation error message when the ${field} is not entered and user blurs out`, async ({
      addContactPage,
      page,
    }) => {
      // Arrange & Act
      await addContactPage[input].click();
      await page.keyboard.press("Tab");

      // Assert
      await expect(addContactPage.submitButton).toBeDisabled();
      await expect(page.getByRole("alert")).toHaveCount(1);
      await expect(page.getByRole("alert")).toBeVisible();
      await expect(page.getByRole("alert")).toHaveText(message);
    });
  });

  (
    [
      {
        field: "First name",
        input: "firstNameInput",
        value: "x",
        message: "First name requires at least 2 characters.",
      },
      {
        field: "Last name",
        input: "lastNameInput",
        value: "x",
        message: "Last name requires at least 2 characters.",
      },
      {
        field: "Email",
        input: "emailInput",
        value: "x@g",
        message: "Email provided has an incorrect format.",
      },
    ] as const
  ).forEach(({ field, input, value, message }) => {
    test(`User sees a validation error message when they enter the ${field} with an incorrect format`, async ({
      addContactPage,
      page,
    }) => {
      // Arrange & Act
      await addContactPage[input].fill(value);

      // Assert
      await expect(addContactPage.submitButton).toBeDisabled();
      await expect(page.getByRole("alert")).toHaveCount(1);
      await expect(page.getByRole("alert")).toBeVisible();
      await expect(page.getByRole("alert")).toHaveText(message);
    });
  });
});
