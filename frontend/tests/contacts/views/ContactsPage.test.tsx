import { screen, within } from "@testing-library/react";
import { createMockContactData, renderWithApi } from "../test-utils";
import { ContactsPage } from "../../../src/contacts/views/ContactsPage";
import { createContactsApiAdapter } from "../../../src/contacts/api/ContactsApiService";

describe("ContactsPage component tests", () => {
  it("should show an error message when there is a problem fetching contacts", async () => {
    // Arrange
    const spy = vi.fn().mockResolvedValue({
      ok: false,
      json: () => ({ status: 500, error: "Something went wrong." }),
    });
    renderWithApi(<ContactsPage />, {
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

  it("should show a list of contacts", async () => {
    // Arrange
    const fakeContactData = createMockContactData(3);
    const spy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });
    renderWithApi(<ContactsPage />, {
      api: createContactsApiAdapter({ request: spy }),
    });

    // Assert
    const contactList = await screen.findByRole("list");

    expect(contactList).toBeVisible();
    expect(contactList.children).toHaveLength(fakeContactData.length);
  });
});
