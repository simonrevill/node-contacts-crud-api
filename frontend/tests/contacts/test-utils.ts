import { faker } from "@faker-js/faker";

import type { IContactsAPI } from "../../src/types";
import type { Contact } from "../../../backend/src/domain/models/Contact";
import { ContactError } from "shared";

export class FakeContactsAPI implements IContactsAPI {
  shouldThrowServerError: boolean;
  contactsData: Contact[];

  constructor(
    contactsData: Contact[] = [],
    shouldThrowServerError: boolean = false
  ) {
    this.contactsData = contactsData;
    this.shouldThrowServerError = shouldThrowServerError;
  }

  async fetchContacts(): Promise<Contact[]> {
    if (this.shouldThrowServerError) {
      throw new ContactError({ status: 500, error: "Something went wrong." });
    }

    return Promise.resolve(this.contactsData);
  }
}

export const createMockContactData = (count: number): Contact[] => {
  return faker.helpers.multiple<Contact>(
    () => ({
      id: faker.number.int(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      createdAt: new Date(Date.now()).toISOString(),
    }),
    { count }
  );
};

export const initialise = (config?: {
  contactsToGenerate: number;
  shouldThrowServerError?: boolean;
}) => {
  const contactsToGenerate = config?.contactsToGenerate || 0;

  const data = createMockContactData(contactsToGenerate);
  const api = new FakeContactsAPI(data, config?.shouldThrowServerError);

  return {
    data,
    api,
  };
};
