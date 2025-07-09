import { screen } from "@testing-library/react";

import { Main } from "components";
import { renderWithProviders } from "test-utils";

describe("Main component tests", () => {
  it("should render correctly", () => {
    // Arrange
    renderWithProviders(<Main />);

    // Assert
    const contactList = screen.getByRole("main");

    expect(contactList).toBeVisible();
  });

  it("should render a list item as a child", () => {
    // Arrange
    renderWithProviders(
      <Main>
        <p>Test child component</p>
      </Main>
    );

    // Assert
    const childComponent = screen.getByText("Test child component");

    expect(childComponent).toBeVisible();
    expect(childComponent).toHaveTextContent("Test child component");
  });

  it("should render a list item with the correct height style", () => {
    // Arrange
    renderWithProviders(<Main />);

    // Assert
    const main = screen.getByRole("main");
    expect(getComputedStyle(main).height).toBe("calc(100dvh - 4.75rem)");
  });
});
