import { describe, beforeEach, expect, it } from "vitest";
import { type Express } from "express";

import { type Contact, type ContactInput } from "../../src/domain/models";
import {
  initialise,
  makeRequest,
  generateNewContactField,
  generateContactWithMissingField,
  getRandomContact,
  getPreviousOrNextUniqueEmail,
} from "../test-utils";

let app: Express;
let fakeContactData: Contact[];

beforeEach(async () => {
  const setup = await initialise({ contactsToGenerate: 10 });
  app = setup.app;
  fakeContactData = setup.fakeData;
});

describe("Given there is existing data in the database", () => {
  describe("When I want to update an existing contact's first name", () => {
    it("Then PUT /api/contacts/:id - should update and return the updated contact", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);
      const updatedFirstName = generateNewContactField(
        existingContact,
        "firstName"
      );
      const updatedContact: Contact = {
        ...existingContact,
        firstName: updatedFirstName,
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 200,
        body: JSON.stringify(updatedContact),
      });

      // Assert
      expect(body).toStrictEqual(updatedContact);
    });
  });

  describe("When I want to update an existing contact's last name", () => {
    it("Then PUT /api/contacts/:id - should update and return the updated contact", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);
      const updatedLastName = generateNewContactField(
        existingContact,
        "lastName"
      );
      const updatedContact: Contact = {
        ...existingContact,
        lastName: updatedLastName,
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 200,
        body: JSON.stringify(updatedContact),
      });

      // Assert
      expect(body).toStrictEqual(updatedContact);
    });
  });

  describe("When I want to update an existing contact's email", () => {
    it("Then PUT /api/contacts/:id - should update and return the updated contact", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);
      const updatedEmail = generateNewContactField(existingContact, "email");
      const updatedContact: Contact = {
        ...existingContact,
        email: updatedEmail,
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 200,
        body: JSON.stringify(updatedContact),
      });

      // Assert
      expect(body).toStrictEqual(updatedContact);
    });
  });

  describe("When I want to update an existing contact but I provide data with missing fields or incorrect formats", () => {
    it("Then PUT /api/contacts/:id - should return a 400 Bad Request error when including an id parameter with an incorrect format", async () => {
      // Arrange
      const idWithBadFormat = "abc";
      const existingContact = getRandomContact(fakeContactData);
      const updatedContact: ContactInput = {
        ...existingContact,
        firstName: "Clark",
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${idWithBadFormat}`,
        expectedStatus: 400,
        body: JSON.stringify(updatedContact),
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

    it("Then PUT /api/contacts/:id - should return a 404 Not Found error when including an id parameter of a non-existant contact", async () => {
      // Arrange
      const nonExistantId = 789;
      const nonExistantContact: ContactInput = {
        firstName: "clark",
        lastName: "kent",
        email: "superman@gmail.com",
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${nonExistantId}`,
        expectedStatus: 404,
        body: JSON.stringify(nonExistantContact),
      });

      // Assert
      expect(body).toStrictEqual({
        status: 404,
        error: `Contact not found.`,
      });
    });

    it.each<{ field: keyof ContactInput }>([
      { field: "firstName" },
      { field: "lastName" },
      { field: "email" },
    ])(
      "Then PUT /api/contacts/:id - should return a 400 Bad Request error when missing $field field",
      async ({ field }) => {
        // Arrange
        const existingContact = getRandomContact(fakeContactData);
        const updatedContact: Partial<Contact> =
          generateContactWithMissingField(existingContact, field);

        // Act
        const { body } = await makeRequest({
          app,
          method: "PUT",
          url: `/api/contacts/${existingContact.id}`,
          expectedStatus: 400,
          body: JSON.stringify(updatedContact),
        });

        // Assert
        expect(body).toStrictEqual({
          status: 400,
          error: [
            {
              expected: "string",
              code: "invalid_type",
              path: [field],
              message: `Expected ${field} but received undefined.`,
            },
          ],
        });
      }
    );

    it("Then PUT /api/contacts/:id - should return a 400 Bad Request error when firstName character length validation fails", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);
      const updatedContact: ContactInput = {
        ...existingContact,
        firstName: "",
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 400,
        body: JSON.stringify(updatedContact),
      });

      // Assert
      expect(body).toStrictEqual({
        status: 400,
        error: [
          {
            origin: "string",
            code: "too_small",
            minimum: 2,
            inclusive: true,
            path: ["firstName"],
            message: "First name requires at least 2 characters.",
          },
        ],
      });
    });

    it("Then PUT /api/contacts/:id - should return a 400 Bad Request error when lastName character length validation fails", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);
      const updatedContact: ContactInput = {
        ...existingContact,
        lastName: "",
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 400,
        body: JSON.stringify(updatedContact),
      });

      // Assert
      expect(body).toStrictEqual({
        status: 400,
        error: [
          {
            origin: "string",
            code: "too_small",
            minimum: 2,
            inclusive: true,
            path: ["lastName"],
            message: "Last name requires at least 2 characters.",
          },
        ],
      });
    });

    it("Then PUT /api/contacts/:id - should return a 400 Bad Request error when email email format validation fails", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);
      const updatedContact: ContactInput = {
        ...existingContact,
        email: "xyzgmail.com",
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 400,
        body: JSON.stringify(updatedContact),
      });

      // Assert
      expect(body).toStrictEqual({
        status: 400,
        error: [
          {
            origin: "string",
            format: "email",
            code: "invalid_format",
            path: ["email"],
            message: "Email provided has an incorrect format.",
            pattern:
              "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
          },
        ],
      });
    });
  });

  describe("When I want to update an existing contact but I provide an already existing email address", () => {
    it("Then PUT /api/contacts/:id - should return a 409 Conflict error", async () => {
      // Arrange
      const existingContact = getRandomContact(fakeContactData);
      const existingContactIndex = fakeContactData.indexOf(existingContact);
      const alreadyExistingEmail = getPreviousOrNextUniqueEmail(
        fakeContactData,
        existingContactIndex
      );
      const updatedContact: ContactInput = {
        ...existingContact,
        email: alreadyExistingEmail,
      };

      // Act
      const { body } = await makeRequest({
        app,
        method: "PUT",
        url: `/api/contacts/${existingContact.id}`,
        expectedStatus: 409,
        body: JSON.stringify(updatedContact),
      });

      // Assert
      expect(body).toStrictEqual({
        status: 409,
        error: `Email address is not unique.`,
      });
    });
  });
});
