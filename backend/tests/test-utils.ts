import { type Express } from "express";
import request, { type Response as SupertestResponse } from "supertest";
import { faker } from "@faker-js/faker";
import { Pool } from "pg";
import { newDb } from "pg-mem";

import { createApp } from "../src/app";
import { ContactsRepository } from "../src/infrastructure/repositories";
import { type IContactsRepository, type HTTPRequestMethod } from "../src/types";
import { type Contact, ContactInput } from "../src/domain/models";

interface MakeRequestConfig {
  app: Express;
  method: HTTPRequestMethod;
  url: string;
  expectedStatus: number;
  body?: string;
}

export async function makeRequest({
  app,
  method,
  url,
  expectedStatus,
  body,
}: MakeRequestConfig): Promise<SupertestResponse> {
  const methodLookup = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
  } as const;

  return await request(app)
    [methodLookup[method]](url)
    .set("Content-Type", "application/json")
    .expect(expectedStatus)
    .send(body);
}

export class ContactBuilder {
  firstName: string;
  lastName: string;
  email: string;

  withFirstName(firstName: string) {
    this.firstName = firstName;

    return this;
  }

  withLastName(lastName: string) {
    this.lastName = lastName;

    return this;
  }

  withEmail(email: string) {
    this.email = email;

    return this;
  }

  build(): ContactInput {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }
}

const createMockContactData = (count: number): ContactInput[] => {
  return faker.helpers.multiple<ContactInput>(
    () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    }),
    { count }
  );
};

const stringifyContactCreatedAtDate = (contact: Contact) => ({
  ...contact,
  createdAt: new Date(contact.createdAt).toISOString(),
});

const createMockDb = async (
  data?: ContactInput[]
): Promise<{ pool: Pool; fakeData: Contact[] }> => {
  const { Pool: InMemoryPool } = newDb().adapters.createPg();
  const pool = new InMemoryPool();
  let fakeData: Contact[] = [];

  await pool.query(
    `CREATE TABLE contacts (
      id SERIAL PRIMARY key, 
      "firstName" VARCHAR(100) NOT NULL, 
      "lastName" VARCHAR(100) NOT NULL, 
      email VARCHAR(100) UNIQUE NOT NULL, 
      "createdAt" TIMESTAMP DEFAULT NOW()
    )`
  );

  if (data) {
    data.forEach(async ({ firstName, lastName, email }) => {
      await pool.query(
        `INSERT INTO contacts ("firstName", "lastName", email) VALUES ($1, $2, $3) RETURNING *`,
        [firstName, lastName, email]
      );
    });

    const result = await pool.query("SELECT * FROM contacts");
    fakeData = result.rows.map(stringifyContactCreatedAtDate);
  }

  return { pool, fakeData };
};

const failingMockRepository: IContactsRepository = {
  getAllContacts: async () => {
    throw new Error("Something went wrong.");
  },
  getContact: async () => {
    throw new Error("Something went wrong.");
  },
  createContact: async () => {
    throw new Error("Something went wrong.");
  },
  updateContact: async () => {
    throw new Error("Something went wrong.");
  },
  deleteContact: async () => {
    throw new Error("Something went wrong.");
  },
};

export const getRandomFakeContactIndex = (length: number) => {
  const min = 0;
  const max = length - 1;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomIndex;
};

interface InitialiseConfig {
  contactsToGenerate?: number;
  withFailingMockRepository?: boolean;
}

export const initialise = async (config?: InitialiseConfig) => {
  const contactsToGenerate = config?.contactsToGenerate || 0;
  const { pool, fakeData } = await createMockDb(
    createMockContactData(contactsToGenerate)
  );
  const contactRepository = config?.withFailingMockRepository
    ? failingMockRepository
    : new ContactsRepository(pool);
  const app = createApp(contactRepository);

  return {
    app,
    fakeData,
  };
};

export const getRandomContact = (fakeContactData: Contact[]): Contact => {
  const randomIndex = getRandomFakeContactIndex(fakeContactData.length);

  return fakeContactData[randomIndex];
};

export const getPreviousOrNextUniqueEmail = (
  fakeContactData: Contact[],
  existingContactIndex: number
) =>
  fakeContactData[
    existingContactIndex > 0
      ? existingContactIndex - 1
      : existingContactIndex + 1
  ].email;

export const generateNewContactField = (
  existingContact: Contact,
  field: keyof ContactInput
) => {
  const existingContactField = existingContact[field];
  let newFieldValue = "";

  switch (field) {
    case "firstName":
      newFieldValue = faker.person.firstName();
    case "lastName":
      newFieldValue = faker.person.lastName();
    case "email":
      newFieldValue = faker.internet.email();
  }

  if (existingContactField === newFieldValue) {
    generateNewContactField(existingContact, field);
  }

  return newFieldValue;
};

export const generateNewFirstName = (existingContact: Contact) => {
  const existingContactFirstName = existingContact.firstName;
  const newFirstName = faker.person.firstName();

  if (existingContactFirstName === newFirstName) {
    generateNewFirstName(existingContact);
  }

  return newFirstName;
};

export const generateNewLastName = (existingContact: Contact) => {
  const existingContactLastName = existingContact.lastName;
  const newLastName = faker.person.lastName();

  if (existingContactLastName === newLastName) {
    generateNewLastName(existingContact);
  }

  return newLastName;
};

export const generateNewEmail = (existingContact: Contact) => {
  const existingContactEmail = existingContact.email;
  const newEmail = faker.internet.email();

  if (existingContactEmail === newEmail) {
    generateNewEmail(existingContact);
  }

  return newEmail;
};

export const generateContactWithMissingField = (
  existingContact: Contact,
  excludedField: keyof ContactInput
) => {
  const contact: Partial<Contact> = {};

  const fieldsToInclude = Object.keys(existingContact).filter(
    (field) => !["id", "createdAt", excludedField].includes(field)
  );

  for (const field of fieldsToInclude) {
    contact[field] = existingContact[field];
  }

  return contact;
};
