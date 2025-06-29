import { type Express } from "express";

import { type Contact } from "../../src/domain/models";
import { initialise, makeRequest, getRandomContact } from "../test-utils";

let app: Express;
let fakeContactData: Contact[];

beforeEach(async () => {
  const setup = await initialise({ contactsToGenerate: 10 });
  app = setup.app;
  fakeContactData = setup.fakeData;
});

describe("Given there is existing data in the database", () => {
  describe("When I want to delete an existing contact", () => {
    it("Then DELETE /api/contacts/:id - should delete the contact", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);

      // Act & Assert
      await makeRequest({
        app,
        method: "DELETE",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 204,
      });
    });

    it("Then DELETE /api/contacts/:id - should return a 204 No Content and send an empty response when deletion is successful", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);

      // Spy on res.send and res.json by mocking the response object
      const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
        json: vi.fn(),
      } as any;

      // Import the sendResponse function directly
      const { sendResponse } = await import(
        "../../src/infrastructure/controllers/contactsController"
      );

      // Act
      sendResponse(res, 204, undefined);

      // Assert
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When I want to delete an existing contact but I provide an incorrect or missing id parameter", () => {
    it("Then DELETE /api/contacts/:id - should return a 400 Bad Request error when including an id parameter with an incorrect format", async () => {
      // Arrange
      const idWithBadFormat = "abc";

      // Act
      const { body } = await makeRequest({
        app,
        method: "DELETE",
        url: `/api/contacts/${idWithBadFormat}`,
        expectedStatus: 400,
      });

      // Assert
      expect(body).toStrictEqual({
        status: 400,
        error: [
          {
            code: "invalid_type",
            expected: "number",
            message: "Invalid contact ID.",
            path: [],
            received: "NaN",
          },
        ],
      });
    });

    it("Then DELETE /api/contacts/:id - should return a 404 Not Found error when including an id parameter of a non-existant contact", async () => {
      // Arrange
      const nonExistantId = 42;

      // Act
      const { body } = await makeRequest({
        app,
        method: "DELETE",
        url: `/api/contacts/${nonExistantId}`,
        expectedStatus: 404,
      });

      // Assert
      expect(body).toStrictEqual({
        status: 404,
        error: `Contact not found.`,
      });
    });
  });
});
