import { screen, within } from "@testing-library/react";

import { ContactsPageContainer } from "components";
import { createMockContactData, renderWithProviders } from "../test-utils";
import { createContactsApiAdapter } from "src/contacts/api/ContactsApiService";
import { AddContactPage } from "src/contacts/views";
import userEvent from "@testing-library/user-event";

describe("ContactsPageContainer component tests", () => {
  it("should render the heading", () => {
    const fakeContactData = createMockContactData(3);
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });
    renderWithProviders(<ContactsPageContainer />, {
      api: createContactsApiAdapter({ request: mock }),
    });

    // Assert
    const mainElement = screen.getByRole("main");
    const heading = within(mainElement).getByRole("heading", {
      level: 2,
      name: "My Contacts",
    });

    expect(mainElement).toBeVisible();
    expect(heading).toBeVisible();
  });

  it("should render the Add Contact button when there is populated list of contacts", async () => {
    // Arrange
    const fakeContactData = createMockContactData(3);
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });
    renderWithProviders(<ContactsPageContainer />, {
      api: createContactsApiAdapter({ request: mock }),
    });

    // Assert
    const mainElement = screen.getByRole("main");
    const addContactButton = within(mainElement).getByRole("button", {
      name: /Add contact/i,
    });

    expect(addContactButton).toBeVisible();
  });

  it("should navigate to the create contact page when clicking on Add contact button", async () => {
    // Arrange
    const user = userEvent.setup();
    const fakeContactData = createMockContactData(3);
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });
    renderWithProviders(
      <>
        <AddContactPage />
        <ContactsPageContainer />
      </>,
      {
        api: createContactsApiAdapter({ request: mock }),
      }
    );
    const addContactButton = screen.getByRole("button", {
      name: /Add contact/i,
    });

    // Act
    await user.click(addContactButton);
    // Assert
    const addContactHeading = screen.getByRole("heading", {
      level: 2,
      name: /Add a contact/i,
    });

    expect(addContactHeading).toBeVisible();
  });

  it("should render children correctly", () => {
    // Arrange
    const ExampleChildComponent = () => (
      <h3>This is a list of your contacts</h3>
    );
    const fakeContactData = createMockContactData(3);
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });
    renderWithProviders(
      <ContactsPageContainer>
        <ExampleChildComponent />
      </ContactsPageContainer>,
      {
        api: createContactsApiAdapter({ request: mock }),
      }
    );

    // Assert
    const exampleChildComponent = screen.getByRole("heading", {
      level: 3,
      name: "This is a list of your contacts",
    });

    expect(exampleChildComponent).toBeVisible();
  });
});
