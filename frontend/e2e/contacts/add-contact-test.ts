import { test as base } from "@playwright/test";
import { AddContactPage } from "./fixtures/AddContactPage";

type Fixtures = {
  addContactPage: AddContactPage;
};

const test = base.extend<Fixtures>({
  addContactPage: async ({ page }, use) => {
    const addContactPage = new AddContactPage(page);
    await addContactPage.goto();
    await use(addContactPage);
  },
});

const { describe, beforeEach } = test;

export { test, describe, beforeEach };
export { expect } from "@playwright/test";
