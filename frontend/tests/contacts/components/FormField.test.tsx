import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { FormField } from "components";
import { renderWithProviders } from "test-utils";

describe("FormField component tests", () => {
  describe("initial rendering", () => {
    it("should render a text input by default", () => {
      // Arrange
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/First name/i);

      // Assert
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "text");
    });

    it("should render a text input for first name", () => {
      // Arrange
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/First name/i);

      // Assert
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("name", "firstName");
      expect(input).toHaveAttribute("placeholder", "Enter your first name");
      expect(input).toHaveValue("");
    });

    it("should render an email input for email", () => {
      // Arrange
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/Email/i);

      // Assert
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("name", "email");
      expect(input).toHaveAttribute("placeholder", "Enter your email address");
      expect(input).toHaveValue("");
    });

    it("should render the label", () => {
      // Arrange
      renderWithProviders(<TestForm />);
      const label = screen.getByText(/First name/i);

      // Assert
      expect(label).toBeVisible();
    });
  });

  describe("validation", () => {
    it("should show required error when field is empty and blurred", async () => {
      // Arrange
      const user = userEvent.setup();
      renderWithProviders(<TestForm />);
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
      renderWithProviders(<TestForm />);
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
      renderWithProviders(
        <TestForm
          defaultValues={{ firstName: "Jane", email: "jane@example.com" }}
        />
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
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/First name/i);

      // Act
      await user.type(input, "Alice");

      // Assert
      expect(input).toHaveValue("Alice");
    });
  });
});

const addContactFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required.")
    .min(2, { message: "First name requires at least 2 characters." }),
  email: z.email({
    error: (issue) => {
      if (issue.input === "") {
        return "Email is required.";
      }
      return "Email provided has an incorrect format.";
    },
  }),
});

type AddContactFormData = z.infer<typeof addContactFormSchema>;

function TestForm({
  defaultValues = { firstName: "", email: "" },
}: {
  defaultValues?: AddContactFormData;
}) {
  const { control } = useForm<AddContactFormData>({
    resolver: zodResolver(addContactFormSchema),
    defaultValues,
    mode: "all",
  });

  return (
    <form>
      <FormField
        name="firstName"
        label="First name"
        control={control}
        placeholder="Enter your first name"
      />
      <FormField
        type="email"
        name="email"
        label="Email"
        control={control}
        placeholder="Enter your email address"
      />
    </form>
  );
}
