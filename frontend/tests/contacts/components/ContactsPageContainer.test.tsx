import { screen, within } from "@testing-library/react";

import { ContactsPageContainer } from "components";
import { renderWithProviders } from "../test-utils";

describe("ContactsPageContainer component tests", () => {
  it("should render the the loading message", () => {
    // Arrange
    renderWithProviders(<ContactsPageContainer>test</ContactsPageContainer>);

    // Assert
    const mainElement = screen.getByRole("main");
    const heading = within(mainElement).getByRole("heading", {
      level: 2,
      name: "My Contacts",
    });

    expect(mainElement).toBeVisible();
    expect(heading).toBeVisible();
  });

  it("should render children correctly", () => {
    // Arrange
    const ExampleChildComponent = () => (
      <h3>This is a list of your contacts</h3>
    );
    renderWithProviders(
      <ContactsPageContainer>
        <ExampleChildComponent />
      </ContactsPageContainer>
    );

    // Assert
    const exampleChildComponent = screen.getByRole("heading", {
      level: 3,
      name: "This is a list of your contacts",
    });

    expect(exampleChildComponent).toBeVisible();
  });
});
