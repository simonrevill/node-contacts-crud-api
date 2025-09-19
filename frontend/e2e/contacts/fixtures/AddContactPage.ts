import type { Locator, Page } from "@playwright/test";

export class AddContactPage {
  heading: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  cancelButton: Locator;
  submitButton: Locator;

  constructor(public readonly page: Page) {
    this.heading = this.page.getByRole("heading", {
      level: 2,
      name: /Add Contact/,
    });
    this.firstNameInput = page.getByLabel("First name");
    this.lastNameInput = page.getByLabel("Last name");
    this.emailInput = page.getByLabel("Email");
    this.cancelButton = page.getByRole("button", { name: /Cancel/i });
    this.submitButton = page.getByRole("button", { name: /Submit/i });
  }

  async goto() {
    await this.page.goto("/create");
  }

  async fillAddContactFormWithValidData() {
    await this.firstNameInput.fill("John");
    await this.lastNameInput.fill("Smith");
    await this.emailInput.fill("john.smith@gmail.com");
  }

  async simulateSubmittingValidForm() {
    await this.page.route("**/api/contacts", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });
  }
}
