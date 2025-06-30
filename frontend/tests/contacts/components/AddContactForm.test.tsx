import { screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";

import { AddContactForm } from "../../../src/contacts/components";
import { renderWithChakraProvider } from "../test-utils";

describe("AddContactForm tests", () => {
  describe("initial rendering", () => {
    it("should render a input field for a first name", async () => {
      // Arrange
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: AddContactForm,
        },
      ]);
      renderWithChakraProvider(<Stub />);

      // Assert
      const firstNameInput: HTMLInputElement =
        screen.getByLabelText(/First name/i);

      expect(firstNameInput).toBeVisible();
      expect(firstNameInput.type).toBe("text");
      expect(firstNameInput.value).toBe("");
    });

    it("should render a input field for a last name", async () => {
      // Arrange
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: AddContactForm,
        },
      ]);
      renderWithChakraProvider(<Stub />);

      // Assert
      const lastNameInput: HTMLInputElement =
        screen.getByLabelText(/Last name/i);

      expect(lastNameInput).toBeVisible();
      expect(lastNameInput.type).toBe("text");
      expect(lastNameInput.value).toBe("");
    });

    it("should render a input field for an email", async () => {
      // Arrange
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: AddContactForm,
        },
      ]);
      renderWithChakraProvider(<Stub />);

      // Assert
      const emailInput: HTMLInputElement = screen.getByLabelText(/Email/i);

      expect(emailInput).toBeVisible();
      expect(emailInput.type).toBe("email");
      expect(emailInput.value).toBe("");
    });

    it("should render a cancel button that links back to the contacts page", async () => {
      // Arrange
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: AddContactForm,
        },
      ]);
      renderWithChakraProvider(<Stub />);

      // Assert
      const backButton = screen.getByRole("link", { name: /Cancel/i });
      expect(backButton).toBeVisible();
      expect(backButton).toHaveAttribute("href", "/");
    });

    it("should render a submit button that submits the form", async () => {
      // Arrange
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: AddContactForm,
        },
      ]);
      renderWithChakraProvider(<Stub />);

      // Assert
      const backButton = screen.getByRole("button", { name: /Submit/i });
      expect(backButton).toBeVisible();
      expect(backButton).not.toBeDisabled();
    });
  });
});
