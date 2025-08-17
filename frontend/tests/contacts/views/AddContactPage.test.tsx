import { screen } from "@testing-library/react";

import { AddContactPage } from "views";
import { renderWithProviders } from "test-utils";

describe("AddContactPage tests", () => {
  it("should render a back button that links back to the contacts page", async () => {
    // Arrange
    renderWithProviders(<AddContactPage />);

    // Act
    const backButton = screen.getByRole("button", { name: /Back/i });

    // Assert
    expect(backButton).toBeVisible();
  });

  it("should render the correct heading", async () => {
    // Arrange
    renderWithProviders(<AddContactPage />);

    // Act
    const addContactHeading = screen.getByRole("heading", {
      level: 2,
      name: /Add a contact/i,
    });

    // Assert
    expect(addContactHeading).toBeVisible();
  });
});
