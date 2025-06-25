import { fetchContacts } from "../../../src/contacts/useCases";
import { FakeContactsAPI } from "../test-utils";
import type { IContactsAPI } from "../../../src/types";
import { ContactError } from "shared";

const fakeAPI: IContactsAPI = new FakeContactsAPI();

describe("Fetching contacts", async () => {
  it("should throw an error when there is a problem fetching contacts from the server", async () => {
    // Arrange
    const fetchContactsPromise = fetchContacts(fakeAPI);

    // Act & Assert
    await expect(fetchContactsPromise).rejects.toBeInstanceOf(ContactError);
    await expect(fetchContactsPromise).rejects.toMatchObject({
      status: 500,
      error: "Something went wrong.",
    });
  });
});
