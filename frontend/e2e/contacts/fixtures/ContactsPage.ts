import type { Locator, Page } from "@playwright/test";

export class ContactsPage {
  header: Locator;
  heading: Locator;
  contactListHeading: Locator;
  loadingMessage: Locator;
  fetchErrorMessageHeading: Locator;
  fetchErrorMessageSubheading: Locator;
  emptyStateAlert: Locator;
  emptyStateHeading: Locator;
  emptyStateSubheading: Locator;
  emptyStateAddContactButton: Locator;
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
    this.loadingMessage = this.page.getByRole("status", {
      name: "Fetching contacts...",
    });
    this.fetchErrorMessageHeading = this.page.getByText(
      "Something went wrong."
    );
    this.fetchErrorMessageSubheading = this.page.getByText(
      "Please try again later"
    );
    this.emptyStateAlert = page.getByRole("alert");
    this.emptyStateHeading = page.getByText("No contacts");
    this.emptyStateSubheading = page.getByText("Add a contact to get started");
    this.emptyStateAddContactButton = this.emptyStateAlert.getByRole("button", {
      name: "Add contact",
    });
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

  async simulateFetchingEmptyContactList() {
    await this.page.route("**/api/contacts", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });
  }

  async simulateServerError() {
    await this.page.route(
      "http://localhost:8080/api/contacts",
      async (route) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            status: 500,
            error: "Something went wrong.",
          }),
        });
      }
    );
  }
}
