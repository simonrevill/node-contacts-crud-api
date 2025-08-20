import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { FormField } from "components";
import { renderWithProviders } from "test-utils";

describe("FormField component tests", () => {
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
    onSubmit,
    defaultValues = { firstName: "", email: "" },
    ...props
  }: {
    onSubmit?: SubmitHandler<AddContactFormData>;
    defaultValues?: AddContactFormData;
  }) {
    const {
      control,
      handleSubmit,
      formState: { isValid, errors },
    } = useForm<AddContactFormData>({
      resolver: zodResolver(addContactFormSchema),
      defaultValues,
      mode: "all",
    });

    return (
      <form onSubmit={handleSubmit(onSubmit ?? (() => {}))}>
        <FormField
          name="firstName"
          label="First name"
          control={control}
          placeholder="Enter your first name"
          type="text"
          {...props}
        />
        <FormField
          type="email"
          name="email"
          label="Email"
          control={control}
          placeholder="Enter your email address"
          {...props}
        />
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
        <div data-testid="errors">{JSON.stringify(errors)}</div>
      </form>
    );
  }

  describe("initial rendering", () => {
    it("should render a text input for first name", () => {
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/First name/i);
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("name", "firstName");
      expect(input).toHaveAttribute("placeholder", "Enter your first name");
      expect(input).toHaveValue("");
    });

    it("should render an email input for email", () => {
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/Email/i);
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("name", "email");
      expect(input).toHaveAttribute("placeholder", "Enter your email address");
      expect(input).toHaveValue("");
    });

    it("should render the label and error text", () => {
      renderWithProviders(<TestForm />);
      expect(screen.getByLabelText(/First name/i)).toBeVisible();
      expect(screen.getByLabelText(/Email/i)).toBeVisible();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("validation", () => {
    it("should show required error when field is empty and blurred", async () => {
      const user = userEvent.setup();
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/First name/i);

      await user.click(input);
      await user.tab();

      expect(input).toHaveValue("");
      expect(screen.getByTestId("errors").textContent).toContain("firstName");
      // Error message should be visible in the error text
      expect(screen.getByRole("alert")).toBeVisible();
    });

    it("should show no error when field is filled", async () => {
      const user = userEvent.setup();
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/First name/i);

      await user.type(input, "John");
      await user.tab();

      expect(input).toHaveValue("John");
      expect(screen.getByTestId("errors").textContent).not.toContain(
        "firstName"
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("controlled value", () => {
    it("should accept a default value", () => {
      renderWithProviders(
        <TestForm
          defaultValues={{ firstName: "Jane", email: "jane@example.com" }}
        />
      );
      expect(screen.getByLabelText(/First name/i)).toHaveValue("Jane");
      expect(screen.getByLabelText(/Email/i)).toHaveValue("jane@example.com");
    });

    it("should update value on user input", async () => {
      const user = userEvent.setup();
      renderWithProviders(<TestForm />);
      const input = screen.getByLabelText(/First name/i);

      await user.type(input, "Alice");
      expect(input).toHaveValue("Alice");
    });
  });

  describe("form submission", () => {
    it("should call onSubmit with form data when valid", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      renderWithProviders(<TestForm onSubmit={handleSubmit} />);

      await user.type(screen.getByLabelText(/First name/i), "Bob");
      await user.type(screen.getByLabelText(/Email/i), "bob@example.com");
      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(handleSubmit).toHaveBeenCalledWith(
        { firstName: "Bob", email: "bob@example.com" },
        expect.anything()
      );
    });

    it("should not call onSubmit if form is invalid", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      renderWithProviders(<TestForm onSubmit={handleSubmit} />);

      await user.click(screen.getByRole("button", { name: /submit/i }));
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
});
