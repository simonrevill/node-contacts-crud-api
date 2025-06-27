import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NoContacts } from "../../../src/contacts/components";
import { renderWithChakraProvider } from "../test-utils";

describe("NoContacts component tests", () => {
  it("should render the the not contacts message and a button to add  new contact", () => {
    // Arrange
    const onAddContactFake = () => {};
    renderWithChakraProvider(<NoContacts onAddContact={onAddContactFake} />);

    const noContactsAlert = screen.getByRole("alert");
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
    expect(noContactsHeading).toBeVisible();
    expect(noContactsMessage).toBeVisible();
    expect(addContactButton).toBeVisible();
  });

  it("should call the onAddContact callback when user clicks on the button", async () => {
    // Arrange
    const user = userEvent.setup();
    const spy = vi.fn();
    renderWithChakraProvider(<NoContacts onAddContact={spy} />);
    const noContactsAlert = screen.getByRole("alert");
    const addContactButton = within(noContactsAlert).getByRole("button", {
      name: /Add contact/i,
    });

    // Act
    await user.click(addContactButton);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
