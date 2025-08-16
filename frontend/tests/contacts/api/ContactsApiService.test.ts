import { createContactsApiAdapter } from "api/ContactsApiService";
import { createMockContactData } from "test-utils";
import { ContactError } from "types";

describe("API service adapter tests", () => {
  it("throws a 500 error when the request fails", async () => {
    // Arrange
    const mockServerError = new ContactError({
      status: 500,
      error: "Something went wrong.",
    });
    const mock = vi.fn().mockResolvedValue({
      ok: false,
    });

    // Act
    const { fetchContacts } = createContactsApiAdapter({ request: mock });

    // Assert
    await expect(fetchContacts()).rejects.toStrictEqual(mockServerError);
  });

  it("returns a list of contacts when there is a successful response", async () => {
    // Arrange
    const fakeContactData = createMockContactData(3);
    const spy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => fakeContactData,
    });

    // Act
    const { fetchContacts } = createContactsApiAdapter({ request: spy });
    const result = await fetchContacts();

    // Assert
    expect(result).toStrictEqual(fakeContactData);
    expect(spy).toHaveBeenCalledWith("http://localhost:8080/api/contacts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  });
});
