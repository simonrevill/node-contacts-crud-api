import type {
  Contact,
  ContactInput,
} from "../../../../backend/src/domain/models/Contact";
import { createContactsApiAdapter } from "../../../src/contacts/api/ContactsApiService";
import { createContact } from "../../../src/contacts/useCases";
import { createMockContact, createMockContactResponse } from "../test-utils";

describe("Creating contacts use case", async () => {
  it("should create and return a new contact with a 201 status and the correct location header", async () => {
    // Arrange
    const newContact: ContactInput = createMockContact();
    const expectedNewContactResponse: Contact =
      createMockContactResponse(newContact);
    const expectedLocation = `/api/contacts/${expectedNewContactResponse.id}`;
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      headers: {
        get: (name: string) => (name === "location" ? expectedLocation : null),
      },
      json: () => expectedNewContactResponse,
    });
    const fakeApi = createContactsApiAdapter({ request: mock });

    // Act
    const { contact, location, status } = await createContact(
      fakeApi,
      newContact
    );

    // Assert
    expect(status).toBe(201);
    expect(contact).toStrictEqual(expectedNewContactResponse);
    expect(location).toStrictEqual(expectedLocation);
  });
});
