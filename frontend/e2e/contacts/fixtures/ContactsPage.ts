import type { Locator, Page } from "@playwright/test";

export class ContactsPage {
  header: Locator;
  heading: Locator;
  contactListHeading: Locator;
  fetchErrorMessageHeading: Locator;
  fetchErrorMessageSubheading: Locator;
  emptyStateHeading: Locator;
  emptyStateSubheading: Locator;
  addContactButton: Locator;

  constructor(public readonly page: Page) {
    this.header = this.page.getByRole("banner");
    this.heading = this.page.getByRole("heading", {
      level: 1,
      name: /Contacts Manager/,
    });
    this.contactListHeading = this.page.getByRole("heading", {
      level: 2,
      name: /My Contacts/,
    });
    this.fetchErrorMessageHeading = this.page.getByText(
      "Something went wrong."
    );
    this.fetchErrorMessageSubheading = this.page.getByText(
      "Please try again later"
    );
    this.emptyStateHeading = page.getByText("No contacts");
    this.emptyStateSubheading = page.getByText("Add a contact to get started");
    this.addContactButton = page.getByRole("button", {
      name: "Add contact",
    });
  }

  async goto() {
    await this.page.goto("/");
  }

  async goToNewContactForm() {
    await this.page.goto("/create");
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
