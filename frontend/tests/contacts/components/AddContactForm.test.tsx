import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddContactForm } from "components";
import { renderWithProviders } from "test-utils";

describe("AddContactForm tests", () => {
  describe("initial rendering", () => {
    it("should render a input field for a first name", async () => {
      // Arrange
      renderWithProviders(<AddContactForm />);

      // Assert
      const firstNameInput: HTMLInputElement =
        screen.getByLabelText(/First name/i);

      expect(firstNameInput).toBeVisible();
      expect(firstNameInput.type).toBe("text");
      expect(firstNameInput.value).toBe("");
    });

    it("should render a input field for a last name", async () => {
      // Arrange
      renderWithProviders(<AddContactForm />);

      // Assert
      const lastNameInput: HTMLInputElement =
        screen.getByLabelText(/Last name/i);

      expect(lastNameInput).toBeVisible();
      expect(lastNameInput.type).toBe("text");
      expect(lastNameInput.value).toBe("");
    });

    it("should render a input field for an email", async () => {
      // Arrange
      renderWithProviders(<AddContactForm />);

      // Assert
      const emailInput: HTMLInputElement = screen.getByLabelText(/Email/i);

      expect(emailInput).toBeVisible();
      expect(emailInput.type).toBe("email");
      expect(emailInput.value).toBe("");
    });

    it("should render a cancel button that links back to the contacts page", async () => {
      // Arrange
      renderWithProviders(<AddContactForm />);

      // Assert
      const cancelButton = screen.getByRole("link", { name: /Cancel/i });
      expect(cancelButton).toBeVisible();
      expect(cancelButton).toHaveAttribute("href", "/");
    });

    it("should render a submit button that submits the form", async () => {
      // Arrange
      renderWithProviders(<AddContactForm />);

      // Assert
      const submitButton = screen.getByRole("button", { name: /Submit/i });
      expect(submitButton).toBeVisible();
      expect(submitButton).toBeDisabled();
    });
  });

  describe("form validation", () => {
    it.each([
      {
        fieldName: "First name",
        error: "First name is required.",
      },
      {
        fieldName: "Last name",
        error: "Last name is required.",
      },
      {
        fieldName: "Email",
        error: "Email is required.",
      },
    ])(
      "should show a required validation error message when the $fieldName is not entered and user blurs out",
      async ({ fieldName, error }) => {
        // Arrange
        const user = userEvent.setup();
        renderWithProviders(<AddContactForm />);

        const field: HTMLInputElement = screen.getByLabelText(fieldName);

        // Act
        await user.click(field);
        await user.tab();

        // Assert
        const alerts = await screen.findAllByRole("alert");
        const errorMessage = await screen.findByRole("alert");
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        expect(field.value).toBe("");
        expect(alerts).toHaveLength(1);
        expect(errorMessage).toBeVisible();
        expect(errorMessage).toHaveTextContent(error);
        expect(submitButton).toBeDisabled();
      }
    );

    it.each([
      {
        fieldName: "First name",
        value: "x",
        error: "First name requires at least 2 characters.",
      },
      {
        fieldName: "Last name",
        value: "x",
        error: "Last name requires at least 2 characters.",
      },
      {
        fieldName: "Email",
        value: "x@g",
        error: "Email provided has an incorrect format.",
      },
    ])(
      "should show a required validation error message when the $fieldName input is not valid ",
      async ({ fieldName, value, error }) => {
        // Arrange
        const user = userEvent.setup();
        renderWithProviders(<AddContactForm />);

        const field: HTMLInputElement = screen.getByLabelText(fieldName);

        // Act
        await user.type(field, value);
        await user.tab();

        // Assert
        const alerts = await screen.findAllByRole("alert");
        const errorMessage = await screen.findByRole("alert");
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        expect(field.value).toBe(value);
        expect(alerts).toHaveLength(1);
        expect(errorMessage).toBeVisible();
        expect(errorMessage).toHaveTextContent(error);
        expect(submitButton).toBeDisabled();
      }
    );

    it("should show no validation errors and an enabled submit button when provided form data is valid", async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProviders(<AddContactForm />);

      // Act
      const validFormData = [
        { fieldName: "First name", value: "John" },
        { fieldName: "Last name", value: "Smith" },
        { fieldName: "Email", value: "john.smith@gmail.com" },
      ] as const;

      for (const { fieldName, value } of validFormData) {
        const field: HTMLInputElement = screen.getByLabelText(fieldName);
        await user.type(field, value);
      }

      // Assert
      const alerts = await screen.queryAllByRole("alert");
      const submitButton = screen.getByRole("button", { name: /Submit/i });

      expect(alerts).toHaveLength(0);
      expect(submitButton).toBeEnabled();
    });
  });

  describe("form submission", () => {
    it("should display submitting text on a disabled submit button when the form is submitted with valid data", async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProviders(<AddContactForm />);

      const firstNameInput: HTMLInputElement =
        screen.getByLabelText(/First name/i);
      const lastNameInput: HTMLInputElement =
        screen.getByLabelText(/Last name/i);
      const emailInput: HTMLInputElement = screen.getByLabelText(/Email/i);
      const submitButton = screen.getByRole("button", { name: /Submit/i });

      // Act
      await user.type(firstNameInput, "John");
      await user.type(lastNameInput, "Smith");
      await user.type(emailInput, "john.smith@gmail.com");
      await user.click(submitButton);

      screen.debug();
      expect(submitButton).toHaveTextContent("Submitting...");
      expect(submitButton).toBeDisabled();
    });
  });
});
