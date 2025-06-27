import { screen, within } from "@testing-library/react";
import { createMockContactData, renderWithProviders } from "../test-utils";
import { ContactsPage } from "../../../src/contacts/views/ContactsPage";
import { createContactsApiAdapter } from "../../../src/contacts/api/ContactsApiService";
import { ContactError } from "shared";

describe("ContactsPage component tests", () => {
  it("should show an error message when there is a problem fetching contacts", async () => {
    // Arrange
    const mockServerError = new ContactError({
      status: 500,
      error: "Something went wrong.",
    });
    const spy = vi.fn().mockResolvedValue({
      ok: false,
      json: () => mockServerError,
    });
    renderWithProviders(<ContactsPage />, {
      api: createContactsApiAdapter({ request: spy }),
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

  it("should show a no contacts alert when there are no contacts", async () => {});

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
