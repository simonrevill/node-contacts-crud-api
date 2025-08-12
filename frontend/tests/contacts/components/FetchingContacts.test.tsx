import { screen } from "@testing-library/react";

import { FetchingContacts } from "components";
import { renderWithProviders } from "../test-utils";

describe("FetchingContacts component tests", () => {
  it("should render the the loading message", () => {
    // Arrange
    renderWithProviders(<FetchingContacts />);

    // Assert
    const loadingMessage = screen.getByRole("status");

    expect(loadingMessage).toBeVisible();
    expect(loadingMessage).toHaveTextContent("Fetching contacts...");
  });
});
