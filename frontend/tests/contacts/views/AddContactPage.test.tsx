import { screen } from "@testing-library/react";

import { AddContactPage } from "../../../src/contacts/views/AddContactPage";
import { renderWithChakraProvider } from "../test-utils";

describe("AddContactPage tests", () => {
  it("should render a back button that links back to the contacts page", async () => {
    // Arrange
    renderWithChakraProvider(<AddContactPage />);

    // Act
    const backButton = screen.getByRole("button", { name: /Back/i });

    // Assert
    expect(backButton).toBeVisible();
  });
});
