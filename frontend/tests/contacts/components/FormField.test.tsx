import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FormField } from "components";
import { createTestFormComponent, renderWithProviders } from "test-utils";
import z from "zod";

export const firstNameSchema = z.object({
  firstName: z
    .string("First name is required.")
    .min(2, { message: "First name requires at least 2 characters." }),
});

export const emailSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.input === "") {
        return "Email is required.";
      }
      return "Email provided has an incorrect format.";
    },
  }),
});

export const testFormSchema = z
  .object({})
  .extend({ ...firstNameSchema.shape, ...emailSchema.shape });

describe("FormField component tests", () => {
  describe("initial rendering", () => {
    it("should render a text input by default", () => {
      // Arrange
      const TestForm = createTestFormComponent(firstNameSchema);
      renderWithProviders(
        <TestForm>
          {(control) => (
            <FormField
              name="firstName"
              label="First name"
              control={control}
              placeholder="Enter a first name"
            />
          )}
        </TestForm>
      );
      const input = screen.getByLabelText(/First name/i);

      // Assert
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "text");
    });

    it("should render a text input for first name", () => {
      // Arrange
      const TestForm = createTestFormComponent(firstNameSchema);
      renderWithProviders(
        <TestForm>
          {(control) => (
            <FormField
              name="firstName"
              label="First name"
              control={control}
              placeholder="Enter a first name"
            />
          )}
        </TestForm>
      );
      const input = screen.getByLabelText(/First name/i);

      // Assert
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("name", "firstName");
      expect(input).toHaveAttribute("placeholder", "Enter a first name");
      expect(input).toHaveValue("");
    });

    it("should render an email input for email", () => {
      // Arrange
      const TestForm = createTestFormComponent(emailSchema);
      renderWithProviders(
        <TestForm>
          {(control) => (
            <FormField
              type="email"
              name="email"
              label="Email"
              control={control}
              placeholder="Enter an email address"
            />
          )}
        </TestForm>
      );
      const input = screen.getByLabelText(/Email/i);

      // Assert
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("name", "email");
      expect(input).toHaveAttribute("placeholder", "Enter an email address");
      expect(input).toHaveValue("");
    });

    it("should render the label", () => {
      // Arrange
      const TestForm = createTestFormComponent(firstNameSchema);
      renderWithProviders(
        <TestForm>
          {(control) => (
            <FormField
              name="firstName"
              label="First name"
              control={control}
              placeholder="Enter a first name"
            />
          )}
        </TestForm>
      );
      const label = screen.getByText(/First name/i);

      // Assert
      expect(label).toBeVisible();
    });
  });

  describe("validation", () => {
    it("should show required error when field is empty and blurred", async () => {
      // Arrange
      const user = userEvent.setup();
      const TestForm = createTestFormComponent(firstNameSchema);
      renderWithProviders(
        <TestForm>
          {(control) => (
            <FormField
              name="firstName"
              label="First name"
              control={control}
              placeholder="Enter a first name"
            />
          )}
        </TestForm>
      );
      const input = screen.getByLabelText(/First name/i);

      // Act
      await user.click(input);
      await user.tab();

      // Assert
      const alert = screen.getByRole("alert");
      expect(input).toHaveValue("");
      expect(alert).toBeVisible();
      expect(alert).toHaveTextContent("First name is required.");
    });

    it("should not show error when field is filled with valid data", async () => {
      // Arrange
      const user = userEvent.setup();
      const TestForm = createTestFormComponent(firstNameSchema);
      renderWithProviders(
        <TestForm>
          {(control) => (
            <FormField
              name="firstName"
              label="First name"
              control={control}
              placeholder="Enter a first name"
            />
          )}
        </TestForm>
      );
      const input = screen.getByLabelText(/First name/i);

      // Act
      await user.type(input, "John");
      await user.tab();

      // Assert
      expect(input).toHaveValue("John");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("controlled value", () => {
    it("should accept a default value", () => {
      // Arrange
      const TestForm = createTestFormComponent(testFormSchema);
      renderWithProviders(
        <TestForm
          defaultValues={{ firstName: "Jane", email: "jane@example.com" }}
        >
          {(control) => (
            <>
              <FormField
                name="firstName"
                label="First name"
                control={control}
                placeholder="Enter a first name"
              />
              <FormField
                type="email"
                name="email"
                label="Email"
                control={control}
                placeholder="Enter an email address"
              />
            </>
          )}
        </TestForm>
      );
      const firstNameInput = screen.getByLabelText(/First name/i);
      const lastNameInput = screen.getByLabelText(/Email/i);

      // Assert
      expect(firstNameInput).toHaveValue("Jane");
      expect(lastNameInput).toHaveValue("jane@example.com");
    });

    it("should update value on user input", async () => {
      // Arrange
      const user = userEvent.setup();
      const TestForm = createTestFormComponent(firstNameSchema);
      renderWithProviders(
        <TestForm>
          {(control) => (
            <FormField
              name="firstName"
              label="First name"
              control={control}
              placeholder="Enter a first name"
            />
          )}
        </TestForm>
      );
      const input = screen.getByLabelText(/First name/i);

      // Act
      await user.type(input, "Alice");

      // Assert
      expect(input).toHaveValue("Alice");
    });
  });
});
