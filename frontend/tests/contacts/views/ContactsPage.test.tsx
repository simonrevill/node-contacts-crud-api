import { act, screen, within } from "@testing-library/react";
import { createMockContactData, renderWithProviders } from "../test-utils";
import { ContactsPage } from "../../../src/contacts/views/ContactsPage";
import { createContactsApiAdapter } from "../../../src/contacts/api/ContactsApiService";
import type { Contact } from "../../../../backend/src/domain/models/Contact";

describe("ContactsPage tests", () => {
  it("should show an error message when there is a problem fetching contacts", async () => {
    // Arrange
    const spy = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });
    await act(async () => {
      renderWithProviders(<ContactsPage />, {
        api: createContactsApiAdapter({ request: spy }),
      });
    });

    // Assert
    const alert = await screen.findByRole("alert");
    const heading = within(alert).getByRole("heading", {
      level: 2,
      name: /Something went wrong./i,
    });
    const subheading = within(alert).getByText(/Please try again later/i);

    expect(heading).toBeVisible();
    expect(subheading).toBeVisible();
  });

  it("should show a no contacts alert when there are no contacts", async () => {
    // Arrange
    const fakeEmptyContactData: Contact[] = [];
    const spy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeEmptyContactData,
    });
    renderWithProviders(<ContactsPage />, {
      api: createContactsApiAdapter({ request: spy }),
    });

    // Assert
    const noContactsAlert = await screen.findByRole("alert");
    const noContactsHeading = within(noContactsAlert).getByRole("heading", {
      level: 2,
      name: /No Contacts/i,
    });
    const noContactsMessage = within(noContactsAlert).getByText(
      /Add a contact to get started/i
    );
    const addContactButton = within(noContactsAlert).getByRole("button", {
      name: /Add contact/i,
    });
    expect(noContactsHeading).toBeVisible();
    expect(noContactsMessage).toBeVisible();
    expect(addContactButton).toBeVisible();
  });

  it("should show a list of contacts", async () => {
    // Arrange
    const fakeContactData = createMockContactData(3);
    const spy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });
    renderWithProviders(<ContactsPage />, {
      api: createContactsApiAdapter({ request: spy }),
    });

    // Assert
    const contactList = await screen.findByRole("list");
    const contacts = within(contactList).getAllByRole("listitem");

    expect(contactList).toBeVisible();
    expect(contacts).toHaveLength(fakeContactData.length);
    fakeContactData.forEach((contact, index) => {
      const contactItem = contacts[index];
      expect(
        within(contactItem).getByText(
          `${contact.firstName} ${contact.lastName}`
        )
      ).toBeVisible();
    });
  });
});
