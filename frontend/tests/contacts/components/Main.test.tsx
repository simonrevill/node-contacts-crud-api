import { screen } from "@testing-library/react";
import { Main } from "../../../src/contacts/components";
import { renderWithChakraProvider } from "../test-utils";

describe("Main component tests", () => {
  it("should render correctly", () => {
    // Arrange
    renderWithChakraProvider(<Main />);

    // Assert
    const contactList = screen.getByRole("main");

    expect(contactList).toBeVisible();
  });

  it("should render a list item as a child", () => {
    // Arrange
    renderWithChakraProvider(
      <Main>
        <p>Test child component</p>
      </Main>
    );

    // Assert
    const childComponent = screen.getByText("Test child component");

    expect(childComponent).toBeVisible();
    expect(childComponent).toHaveTextContent("Test child component");
  });
});
