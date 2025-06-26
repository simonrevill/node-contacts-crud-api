import { render, screen, within } from "@testing-library/react";
import { Header } from "../../../src/contacts/components/Header";

describe("Header component tests", () => {
  it("should render the correct heading", () => {
    // Arrange
    render(<Header />);

    screen.debug();

    // Assert
    const header = screen.getByRole("banner");
    const heading = within(header).getByRole("heading", {
      level: 1,
      name: /Contacts Manager/i,
    });
    expect(heading).toBeVisible();
  });
});
