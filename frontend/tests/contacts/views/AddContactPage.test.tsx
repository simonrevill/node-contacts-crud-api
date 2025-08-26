import { screen } from "@testing-library/react";

import { AddContactPage } from "views";
import { renderWithProviders } from "test-utils";

describe("AddContactPage tests", () => {
  it("should render a back button that links back to the contacts page", async () => {
    // Arrange
    renderWithProviders(<AddContactPage />);
    const backButton = screen.getByRole("button", { name: /Back/i });

    // Assert
    expect(backButton).toBeVisible();
  });

  it("should render the correct heading", async () => {
    // Arrange
    renderWithProviders(<AddContactPage />);
    const addContactHeading = screen.getByRole("heading", {
      level: 2,
      name: /Add a contact/i,
    });

    // Assert
    expect(addContactHeading).toBeVisible();
  });

  it("should render the add new contact form with the correct inputs", () => {
    // Arrange
    renderWithProviders(<AddContactPage />);
    const form = screen.getByRole("form", {
      name: /Add a contact/i,
    });
    const firstNameInput = screen.getByLabelText(/First name/i);
    const lastNameInput = screen.getByLabelText(/Last name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    // Assert
    expect(form).toBeVisible();
    expect(firstNameInput).toBeVisible();
    expect(firstNameInput).toHaveAttribute("type", "text");
    expect(firstNameInput).toHaveAttribute("name", "firstName");
    expect(firstNameInput).toHaveAttribute(
      "placeholder",
      "Enter your first name"
    );
    expect(firstNameInput).toHaveValue("");
    expect(lastNameInput).toBeVisible();
    expect(lastNameInput).toHaveAttribute("type", "text");
    expect(lastNameInput).toHaveAttribute("name", "lastName");
    expect(lastNameInput).toHaveAttribute(
      "placeholder",
      "Enter your last name"
    );
    expect(lastNameInput).toHaveValue("");
    expect(emailInput).toBeVisible();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute(
      "placeholder",
      "Enter your email address"
    );
    expect(emailInput).toHaveValue("");
    expect(cancelButton).toBeVisible();
    expect(cancelButton).toBeEnabled();
    expect(submitButton).toBeVisible();
    expect(submitButton).toBeDisabled();
  });
});
