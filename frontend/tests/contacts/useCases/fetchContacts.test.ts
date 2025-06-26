import type { Contact } from "../../../../backend/src/domain/models/Contact";
import { fetchContacts } from "../../../src/contacts/useCases";
import type { IContactsAPI } from "../../../src/types";
import { initialise } from "../test-utils";
import { ContactError } from "shared";

let fakeApi: IContactsAPI;
let fakeContactData: Contact[];

describe("Fetching contacts with a server error", async () => {
  beforeEach(() => {
    const { data, api } = initialise({
      contactsToGenerate: 0,
      shouldThrowServerError: true,
    });

    fakeContactData = data;
    fakeApi = api;
  });

  it("should throw an error when there is a problem fetching contacts from the server", async () => {
    // Arrange
    const fetchContactsPromise = fetchContacts(fakeApi);

    // Act & Assert
    await expect(fetchContactsPromise).rejects.toBeInstanceOf(ContactError);
    await expect(fetchContactsPromise).rejects.toMatchObject({
      status: 500,
      error: "Something went wrong.",
    });
  });
});

describe("Fetching contacts when there are no existing contacts in the database", async () => {
  beforeEach(() => {
    const { data, api } = initialise({
      contactsToGenerate: 0,
    });

    fakeContactData = data;
    fakeApi = api;
  });

  it("should return an empty list of contacts ", async () => {
    // Arrange & Act
    const result = await fetchContacts(fakeApi);

    // Assert
    expect(result).toStrictEqual(fakeContactData);
  });
});

describe("Fetching contacts when there are existing contacts in the database", async () => {
  beforeEach(() => {
    const { data, api } = initialise({
      contactsToGenerate: 10,
    });

    fakeContactData = data;
    fakeApi = api;
  });

  it("should return a list of contacts when there are existing contacts in the database", async () => {
    // Arrange & Act
    const result = await fetchContacts(fakeApi);

    // Assert
    expect(result).toStrictEqual(fakeContactData);
  });
});
