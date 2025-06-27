import { screen, within } from "@testing-library/react";
import { Header } from "../../../src/contacts/components/Header";
import { renderWithChakraProvider } from "../test-utils";

describe("Header component tests", () => {
  it("should render the correct heading", () => {
    // Arrange
    renderWithChakraProvider(<Header />);

    screen.debug();
    // Assert
    const header = screen.getByRole("banner");
    const heading = within(header).getByRole("heading", {
      level: 1,
      name: /Contacts Manager/i,
    });
    expect(heading).toBeVisible();
  });

  it("should render a menu button to toggle the menu open and closed state", () => {
    // Arrange
    renderWithChakraProvider(<Header />);

    // Assert
    const header = screen.getByRole("banner");
    const menuButton = within(header).getByRole("button", {
      name: /Menu/i,
    });
    expect(menuButton).toBeVisible();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });
});
