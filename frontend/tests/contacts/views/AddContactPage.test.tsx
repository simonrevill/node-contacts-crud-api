import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddContactPage, ContactsPage } from "views";
import {
  apiStub,
  ContactBuilder,
  createMockContactData,
  renderWithProviders,
} from "test-utils";
import { Route, Routes } from "react-router";
import { createContactsApiAdapter } from "src/contacts/api/ContactsApiService";

describe("AddContactPage tests", () => {
  it("should render a back button that links back to the contacts page", async () => {
    // Arrange
    renderWithProviders(<AddContactPage />, { api: apiStub });
    const backButton = screen.getByRole("button", { name: /Back/i });

    // Assert
    expect(backButton).toBeVisible();
  });

  it("should render the correct heading", async () => {
    // Arrange
    renderWithProviders(<AddContactPage />, { api: apiStub });
    const addContactHeading = screen.getByRole("heading", {
      level: 2,
      name: /Add a contact/i,
    });

    // Assert
    expect(addContactHeading).toBeVisible();
  });

  it("should render the add new contact form with the correct inputs", () => {
    // Arrange
    renderWithProviders(<AddContactPage />, { api: apiStub });
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
    expect(firstNameInput).toHaveAttribute("placeholder", "Enter a first name");
    expect(firstNameInput).toHaveValue("");
    expect(lastNameInput).toBeVisible();
    expect(lastNameInput).toHaveAttribute("type", "text");
    expect(lastNameInput).toHaveAttribute("name", "lastName");
    expect(lastNameInput).toHaveAttribute("placeholder", "Enter a last name");
    expect(lastNameInput).toHaveValue("");
    expect(emailInput).toBeVisible();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("placeholder", "Enter an email address");
    expect(emailInput).toHaveValue("");
    expect(cancelButton).toBeVisible();
    expect(cancelButton).toBeEnabled();
    expect(submitButton).toBeVisible();
    expect(submitButton).toBeDisabled();
  });

  it("should navigate back to the contacts page showing the new contact when user submits a valid new contact", async () => {
    // Arrange
    const user = userEvent.setup();
    const existingContacts = createMockContactData(3);
    const newContact = new ContactBuilder()
      .withFirstName("John")
      .withLastName("Doe")
      .withEmail("john.doe@example.com");
    const mock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(existingContacts),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([...existingContacts, newContact]),
      });
    renderWithProviders(
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="/create" element={<AddContactPage />} />
      </Routes>,
      {
        api: createContactsApiAdapter({ request: mock }),
        initialEntries: ["/create"],
      }
    );
    const firstNameInput = screen.getByLabelText(/First name/i);
    const lastNameInput = screen.getByLabelText(/Last name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    // Act
    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "john.doe@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(`${newContact.firstName} ${newContact.lastName}`)
      ).toBeVisible();
    });
  });
});
