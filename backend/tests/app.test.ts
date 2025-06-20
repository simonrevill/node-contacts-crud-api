import { describe, beforeEach, expect, it } from "vitest";
import { type Express } from "express";

import { type Contact } from "../src/domain/models";
import {
  initialise,
  ContactBuilder,
  makeRequest,
  generateNewContactField,
  generateContactWithMissingField,
  getRandomContact,
  getPreviousOrNextUniqueEmail,
} from "./test-utils";
import { ContactInput } from "../src/domain/models/Contact";

let app: Express;
let fakeContactData: Contact[];

describe("Contacts API", () => {
  beforeEach(async () => {
    const setup = await initialise({ withFailingMockRepository: true });
    app = setup.app;
    fakeContactData = setup.fakeData;
  });

  describe("Given there is an issue with fetching data from the database", () => {
    describe("---- FETCHING CONTACTS ----", () => {
      describe("When I want to fetch a list of contacts", () => {
        it("Then GET /api/contacts - should return a 500 Internal Server Error", async () => {
          // Arrange & Act
          const { body } = await makeRequest({
            app,
            method: "GET",
            url: "/api/contacts",
            expectedStatus: 500,
          });

          // Assert
          expect(body).toStrictEqual({
            status: 500,
            error: "Something went wrong.",
          });
        });
      });
    });
  });

  describe("Given there is no existing data in the database", () => {
    beforeEach(async () => {
      const setup = await initialise();
      app = setup.app;
      fakeContactData = setup.fakeData;
    });

    describe("---- FETCHING CONTACTS ----", () => {
      describe("When I want to fetch a list of contacts", () => {
        it("Then GET /api/contacts - should return an empty list of contacts", async () => {
          // Arrange
          const expectedResponseBody: Contact[] = [];

          // Act
          const { body } = await makeRequest({
            app,
            method: "GET",
            url: "/api/contacts",
            expectedStatus: 200,
          });

          // Assert
          expect(body).toStrictEqual(expectedResponseBody);
        });
      });
    });
  });

  describe("Given there is existing data in the database", () => {
    beforeEach(async () => {
      const setup = await initialise({ contactsToGenerate: 10 });
      app = setup.app;
      fakeContactData = setup.fakeData;
    });

    describe("---- FETCHING CONTACTS ----", () => {
      describe("When I want to fetch a list of contacts", () => {
        it("Then GET /api/contacts - should return a list of contacts", async () => {
          // Arrange
          const expectedContact: Contact[] = fakeContactData;

          // Act
          const { body } = await makeRequest({
            app,
            method: "GET",
            url: "/api/contacts",
            expectedStatus: 200,
          });

          // Assert
          expect(body).toStrictEqual(expectedContact);
        });
      });

      describe("When I want to fetch a specific contact", () => {
        it("Then GET /api/contacts/:id - should return a specific contact", async () => {
          // Arrange
          const expectedContact: Contact = getRandomContact(fakeContactData);

          // Act
          const { body } = await makeRequest({
            app,
            method: "GET",
            url: `/api/contacts/${expectedContact.id}`,
            expectedStatus: 200,
          });

          // Assert
          expect(body).toStrictEqual(expectedContact);
        });
      });

      describe("When I want to fetch a specific contact with a non-existent id", () => {
        it("Then GET /api/contacts/:id - should return a 404 Not Found error", async () => {
          // Arrange
          const nonExistentId = 42;

          // Act
          const { body } = await makeRequest({
            app,
            method: "GET",
            url: `/api/contacts/${nonExistentId}`,
            expectedStatus: 404,
          });

          // Assert
          expect(body).toStrictEqual({
            status: 404,
            error: `Contact not found.`,
          });
        });
      });

      describe("When I want to fetch a specific contact with an id supplied with an incorrect format", () => {
        it("Then GET /api/contacts/:id - should return a 400 Bad Request error", async () => {
          // Arrange
          const idWithBadFormat = "abc";

          // Act
          const { body } = await makeRequest({
            app,
            method: "GET",
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
      });
    });

    describe("---- CREATING CONTACTS ----", () => {
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
    });

    describe("---- UPDATING CONTACTS ----", () => {
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
          const updatedEmail = generateNewContactField(
            existingContact,
            "email"
          );
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

    describe("---- DELETING CONTACTS ----", () => {
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
  });
});
