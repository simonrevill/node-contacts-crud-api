import type { Contact } from "../../../../backend/src/domain/models/Contact";
import { createContactsApiAdapter } from "../../../src/contacts/api/ContactsApiService";
import { fetchContacts } from "../../../src/contacts/useCases";
import { createMockContactData } from "../test-utils";
import { ContactError } from "../../../src/types";

describe("Fetching contacts use case", async () => {
  it("should throw an error when there is a problem fetching contacts from the server", async () => {
    // Arrange
    const mockServerError = new ContactError({
      status: 500,
      error: "Something went wrong.",
    });
    const mock = vi.fn().mockResolvedValue({
      ok: false,
    });
    const fakeApi = createContactsApiAdapter({ request: mock });
    const fetchContactsPromise = fetchContacts(fakeApi);

    // Act & Assert
    await expect(fetchContactsPromise).rejects.toBeInstanceOf(ContactError);
    await expect(fetchContactsPromise).rejects.toMatchObject(mockServerError);
  });

  it("should return an empty list of contacts when there are existing contacts in the database", async () => {
    // Arrange
    const fakeEmptyContactData: Contact[] = [];
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeEmptyContactData,
    });
    const fakeApi = createContactsApiAdapter({ request: mock });

    // Act
    const result = await fetchContacts(fakeApi);

    // Assert
    expect(result).toStrictEqual(fakeEmptyContactData);
  });

  it("should return a list of contacts when there are existing contacts in the database", async () => {
    // Arrange
    const fakeContactData = createMockContactData(3);
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });
    const fakeApi = createContactsApiAdapter({ request: mock });

    // Act
    const result = await fetchContacts(fakeApi);

    // Assert
    expect(result).toStrictEqual(fakeContactData);
  });
});
