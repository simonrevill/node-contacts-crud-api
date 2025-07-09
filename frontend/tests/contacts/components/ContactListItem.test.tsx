import { screen } from "@testing-library/react";

import { ContactList, ContactListItem } from "components";
import { renderWithProviders } from "test-utils";

describe("ContactListItem component tests", () => {
  it("should render correctly", () => {
    // Arrange
    renderWithProviders(
      <ContactList>
        <ContactListItem />
      </ContactList>
    );

    // Assert
    const contactListItem = screen.getByRole("listitem");

    expect(contactListItem).toBeVisible();
  });

  it("should render the last list item without a border", () => {
    // Arrange
    renderWithProviders(
      <ContactList>
        <ContactListItem />
        <ContactListItem />
      </ContactList>
    );

    // Assert
    const contactListItems = screen.getAllByRole("listitem");
    const lastContactListItem = contactListItems[1];
    const lastContactListItemStyle = getComputedStyle(lastContactListItem);

    expect(lastContactListItemStyle.borderBottomWidth).toBe("");
  });
});
