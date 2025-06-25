import { describe, beforeEach, expect, it } from "vitest";
import { type Express } from "express";

import { type Contact } from "../../src/domain/models";
import { initialise, makeRequest, getRandomContact } from "../test-utils";

let app: Express;
let fakeContactData: Contact[];

describe("Given there is an issue with fetching data from the database", () => {
  beforeEach(async () => {
    const setup = await initialise({ withFailingMockRepository: true });
    app = setup.app;
    fakeContactData = setup.fakeData;
  });

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

describe("Given there is no existing data in the database", () => {
  beforeEach(async () => {
    const setup = await initialise();
    app = setup.app;
    fakeContactData = setup.fakeData;
  });

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

describe("Given there is existing data in the database", () => {
  beforeEach(async () => {
    const setup = await initialise({ contactsToGenerate: 10 });
    app = setup.app;
    fakeContactData = setup.fakeData;
  });

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
