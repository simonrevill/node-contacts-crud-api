import { screen, within } from "@testing-library/react";

import { NoContacts } from "../../../src/contacts/components";
import { renderWithChakraProvider } from "../test-utils";
import { createRoutesStub } from "react-router";

describe("NoContacts component tests", () => {
  it("should render the the no contacts message and a button to add a new contact", () => {
    // Arrange
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: NoContacts,
      },
    ]);
    renderWithChakraProvider(<Stub />);

    const noContactsAlert = screen.getByRole("alert");
    const noContactsIcon =
      within(noContactsAlert).getByLabelText("No contacts icon");
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

    // Assert
    expect(noContactsIcon).toBeVisible();
    expect(noContactsHeading).toBeVisible();
    expect(noContactsMessage).toBeVisible();
    expect(addContactButton).toBeVisible();
  });
});
