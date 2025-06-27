import { screen, within } from "@testing-library/react";
import { initialise, renderWithApi } from "../test-utils";
import { ContactsPage } from "../../../src/contacts/views/ContactsPage";
import type { IContactsAPI } from "../../../src/types";

let fakeApi: IContactsAPI;

describe("ContactsPage component tests", () => {
  beforeEach(() => {
    const { api } = initialise({
      shouldThrowServerError: true,
    });

    fakeApi = api;
  });

  it("should show an error message when there is a problem fetching contacts", async () => {
    // Arrange
    renderWithApi(<ContactsPage />, { api: fakeApi });

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
});
