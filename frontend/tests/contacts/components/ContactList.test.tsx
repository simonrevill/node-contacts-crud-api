import { screen, within } from "@testing-library/react";
import { ContactList, ContactListItem } from "../../../src/contacts/components";
import { renderWithChakraProvider } from "../test-utils";

describe("ContactList component tests", () => {
  it("should render correctly", () => {
    // Arrange
    renderWithChakraProvider(<ContactList />);

    // Assert
    const contactList = screen.getByRole("list");

    expect(contactList).toBeVisible();
  });

  it("should render a list item as a child", () => {
    // Arrange
    renderWithChakraProvider(
      <ContactList>
        <ContactListItem>Example list item</ContactListItem>
      </ContactList>
    );

    // Assert
    const contactList = screen.getByRole("list");
    const contactListItem = within(contactList).getByRole("listitem");

    expect(contactListItem).toBeVisible();
    expect(contactListItem).toHaveTextContent("Example list item");
  });
});
