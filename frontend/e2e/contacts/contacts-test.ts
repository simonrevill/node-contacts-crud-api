import { test as base } from "@playwright/test";
import { ContactsPage } from "./fixtures/ContactsPage";

type Fixtures = {
  contactsPage: ContactsPage;
};

const test = base.extend<Fixtures>({
  contactsPage: async ({ page }, use) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await use(contactsPage);
  },
});

const { describe, beforeEach } = test;

export { test, describe, beforeEach };
export { expect } from "@playwright/test";
