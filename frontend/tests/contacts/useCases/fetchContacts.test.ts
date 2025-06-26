import { fetchContacts } from "../../../src/contacts/useCases";
import { createMockContactData, FakeContactsAPI } from "../test-utils";
import { ContactError } from "shared";

describe("Fetching contacts", async () => {
  it("should throw an error when there is a problem fetching contacts from the server", async () => {
    // Arrange
    const fakeApiWithServerError = new FakeContactsAPI([], true);
    const fetchContactsPromise = fetchContacts(fakeApiWithServerError);

    // Act & Assert
    await expect(fetchContactsPromise).rejects.toBeInstanceOf(ContactError);
    await expect(fetchContactsPromise).rejects.toMatchObject({
      status: 500,
      error: "Something went wrong.",
    });
  });

  it("should return a list of contacts", async () => {
    // Arrange
    const fakeContactData = createMockContactData(10);
    const fakeApiWithContactsData = new FakeContactsAPI(fakeContactData);

    // Act
    const result = await fetchContacts(fakeApiWithContactsData);

    // Assert
    expect(result).toStrictEqual(fakeContactData);
  });
});
