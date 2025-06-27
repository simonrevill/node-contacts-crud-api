import { screen } from "@testing-library/react";
import { ContactList, ContactListItem } from "../../../src/contacts/components";
import { renderWithChakraProvider } from "../test-utils";

describe("ContactListItem component tests", () => {
  it("should render correctly", () => {
    // Arrange
    renderWithChakraProvider(
      <ContactList>
        <ContactListItem />
      </ContactList>
    );

    // Assert
    const contactListItem = screen.getByRole("listitem");

    expect(contactListItem).toBeVisible();
  });
});
