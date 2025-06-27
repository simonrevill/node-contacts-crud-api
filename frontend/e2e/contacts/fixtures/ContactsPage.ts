import type { Locator, Page } from "@playwright/test";

export class ContactsPage {
  header: Locator;
  heading: Locator;
  fetchErrorMessageHeading: Locator;
  fetchErrorMessageSubheading: Locator;
  emptyStateHeading: Locator;
  emptyStateSubheading: Locator;
  emptyStateAddContactButton: Locator;

  constructor(public readonly page: Page) {
    this.header = this.page.getByRole("banner");
    this.heading = this.page.getByRole("heading", {
      level: 1,
      name: /Contacts Manager/,
    });
    this.fetchErrorMessageHeading = this.page.getByText(
      "Something went wrong."
    );
    this.fetchErrorMessageSubheading = this.page.getByText(
      "Please try again later"
    );
    this.emptyStateHeading = page.getByText("No contacts");
    this.emptyStateSubheading = page.getByText("Add a contact to get started");
    this.emptyStateAddContactButton = page.getByRole("button", {
      name: "Add contact",
    });
  }

  async goto() {
    await this.page.goto("/");
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
