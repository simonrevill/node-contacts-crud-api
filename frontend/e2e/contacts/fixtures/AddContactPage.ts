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
}
