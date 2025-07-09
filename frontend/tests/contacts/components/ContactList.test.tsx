import { screen, within } from "@testing-library/react";

import { ContactList, ContactListItem } from "components";
import { renderWithProviders } from "test-utils";

describe("ContactList component tests", () => {
  it("should render correctly", () => {
    // Arrange
    renderWithProviders(<ContactList />);

    // Assert
    const contactList = screen.getByRole("list");

    expect(contactList).toBeVisible();
  });

  it("should render a list item as a child", () => {
    // Arrange
    renderWithProviders(
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
