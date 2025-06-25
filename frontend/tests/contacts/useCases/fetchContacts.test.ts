import { fetchContacts } from "@/contacts/useCases";
import { FakeContactsAPI } from "../test-utils";
import type { IContactsAPI } from "@/types";
import { ContactError } from "../../../../backend/src/utils";

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
