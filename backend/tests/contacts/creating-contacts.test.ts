import express from "express";
import { createContactsRouter } from "../../src/infrastructure/controllers/contactsController";
import { type Express } from "express";

import { type Contact, type ContactInput } from "../../src/domain/models";
import {
  initialise,
  ContactBuilder,
  makeRequest,
  getRandomContact,
  makeBrokenContactsAppWithUndefinedCreateContact,
} from "../test-utils";

let app: Express;
let fakeContactData: Contact[];

beforeEach(async () => {
  const setup = await initialise({ contactsToGenerate: 10 });
  app = setup.app;
  fakeContactData = setup.fakeData;
});

describe("Given there is existing data in the database", () => {
  describe("When I want to create a new contact", () => {
    it("Then POST /api/contacts - should create and return a new contact with a location header", async () => {
      // Arrange
      const newContact = new ContactBuilder()
        .withFirstName("Joe")
        .withLastName("Bloggs")
        .withEmail("jb@example.com")
        .build();

      // Act
      const { headers, body } = await makeRequest({
        app,
        method: "POST",
        url: `/api/contacts`,
        expectedStatus: 201,
        body: JSON.stringify(newContact),
      });

      // Assert
      expect(headers["location"]).toBe(`/api/contacts/${body.id}`);
      expect(body).toStrictEqual({
        id: body.id,
        ...newContact,
        createdAt: body.createdAt,
      });
    });
  });

  describe("When I want to create a new contact but I provide data with missing fields or incorrect formats", () => {
    it.each<{ field: keyof ContactInput } & Partial<ContactInput>>([
      {
        field: "firstName",
        firstName: undefined,
        lastName: "Bloggs",
        email: "jb@example.com",
      },
      {
        field: "lastName",
        firstName: "Joe",
        lastName: undefined,
        email: "jb@example.com",
      },
      {
        field: "email",
        firstName: "Joe",
        lastName: "Bloggs",
        email: undefined,
      },
    ])(
      "Then POST /api/contacts - should return a 400 Bad Request error when missing $field field",
      async ({ field, firstName, lastName, email }) => {
        const newContact = new ContactBuilder()
          .withFirstName(firstName!)
          .withLastName(lastName!)
          .withEmail(email!)
          .build();

        // Act
        const { body } = await makeRequest({
          app,
          method: "POST",
          url: `/api/contacts`,
          expectedStatus: 400,
          body: JSON.stringify(newContact),
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

    it.each<
      {
        field: keyof ContactInput;
        fieldName: "First name" | "Last name";
      } & ContactInput
    >([
      {
        field: "firstName",
        fieldName: "First name",
        firstName: "",
        lastName: "Bloggs",
        email: "jb@example.com",
      },
      {
        field: "lastName",
        fieldName: "Last name",
        firstName: "Joe",
        lastName: "",
        email: "jb@example.com",
      },
    ])(
      "Then POST /api/contacts - should return a 400 Bad Request error when $field character length validation fails",
      async ({ field, fieldName, firstName, lastName, email }) => {
        const newContact = new ContactBuilder()
          .withFirstName(firstName)
          .withLastName(lastName)
          .withEmail(email)
          .build();

        // Act
        const { body } = await makeRequest({
          app,
          method: "POST",
          url: `/api/contacts`,
          expectedStatus: 400,
          body: JSON.stringify(newContact),
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
              path: [field],
              message: `${fieldName} requires at least 2 characters.`,
            },
          ],
        });
      }
    );

    it("Then POST /api/contacts - should return a 400 Bad Request error when email format validation fails", async () => {
      const newContact = new ContactBuilder()
        .withFirstName("Joe")
        .withLastName("Bloggs")
        .withEmail("xyzgmail.com")
        .build();

      // Act
      const { body } = await makeRequest({
        app,
        method: "POST",
        url: `/api/contacts`,
        expectedStatus: 400,
        body: JSON.stringify(newContact),
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

  describe("When I want to create a new contact but I provide an already existing email address", () => {
    it("Then POST /api/contacts - should return a 409 Conflict error", async () => {
      // Arrange
      const alreadyExistingEmail = getRandomContact(fakeContactData).email;
      const newContact = new ContactBuilder()
        .withFirstName("Joe")
        .withLastName("Bloggs")
        .withEmail(alreadyExistingEmail)
        .build();

      // Act
      const { body } = await makeRequest({
        app,
        method: "POST",
        url: `/api/contacts`,
        expectedStatus: 409,
        body: JSON.stringify(newContact),
      });

      // Assert
      expect(body).toStrictEqual({
        status: 409,
        error: `Email address is not unique.`,
      });
    });
  });

  describe("When I want to create a new contact but there is an issue with the server", () => {
    it("Then POST /api/contacts - should handle the case where contact is undefined and not set the Location header", async () => {
      // Arrange
      const brokenApp = makeBrokenContactsAppWithUndefinedCreateContact();
      const newContact = new ContactBuilder()
        .withFirstName("Jane")
        .withLastName("Doe")
        .withEmail("janedoe@example.com")
        .build();

      // Act
      const { headers, body } = await makeRequest({
        app: brokenApp,
        method: "POST",
        url: `/api/contacts`,
        expectedStatus: 201, // or whatever your controller does in this case
        body: JSON.stringify(newContact),
      });

      // Assert
      expect(headers["location"]).toBeUndefined();
      expect(body).toEqual({}); // Express returns an empty object for no content
    });
  });
});
