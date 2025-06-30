import { screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";

import { AddContactForm } from "../../../src/contacts/components";
import { renderWithChakraProvider } from "../test-utils";

describe("AddContactPage tests", () => {
  it("should render a cancel button that links back to the contacts page", async () => {
    // Arrange
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: AddContactForm,
      },
    ]);
    renderWithChakraProvider(<Stub />);

    // Assert
    const backButton = screen.getByRole("link", { name: /Cancel/i });
    expect(backButton).toBeVisible();
    expect(backButton).toHaveAttribute("href", "/");
  });
});
