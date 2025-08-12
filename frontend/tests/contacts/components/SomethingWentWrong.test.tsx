import { screen, within } from "@testing-library/react";

import { SomethingWentWrong } from "components";
import { renderWithProviders } from "../test-utils";

describe("SomethingWentWrong component tests", () => {
  it("should render the the loading message", () => {
    // Arrange
    renderWithProviders(<SomethingWentWrong />);

    // Assert
    const alert = screen.getByRole("alert");
    const errorHeading = within(alert).getByRole("heading", {
      level: 2,
      name: "Something went wrong.",
    });
    const errorMessage = within(alert).getByText("Please try again later");

    expect(errorHeading).toBeVisible();
    expect(errorMessage).toBeVisible();
  });
});
