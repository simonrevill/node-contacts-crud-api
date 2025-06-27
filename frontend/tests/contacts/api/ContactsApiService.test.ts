import { createContactsApiAdapter } from "../../../src/contacts/api/ContactsApiService";
import { createMockContactData } from "../test-utils";

describe("API service adapter tests", () => {
  it("throws a 500 error when the request fails", async () => {
    // Arrange
    const spy = vi.fn().mockResolvedValue({
      ok: false,
      json: () => "x",
    });

    // Act
    const { fetchContacts } = createContactsApiAdapter({ request: spy });

    // Assert
    expect(async () => await fetchContacts()).rejects.toMatchObject({
      status: 500,
      error: "Something went wrong.",
    });
    expect(spy).toHaveBeenCalledWith("http://localhost:8080/api/contacts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
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
  });
});
