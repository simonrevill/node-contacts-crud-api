import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import { ContactsApiProvider } from "../../src/contacts/api/ContactsApiProvider";
import { faker } from "@faker-js/faker";

import type { IContactsAPI } from "../../src/types";
import type {
  Contact,
  ContactInput,
} from "../../../backend/src/domain/models/Contact";

export const createMockContact = (): ContactInput => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
});

export const createMockContactData = (count: number): Contact[] => {
  return faker.helpers.multiple<Contact>(
    () => ({
      id: faker.number.int(),
      ...createMockContact(),
      createdAt: new Date(Date.now()).toISOString(),
    }),
    { count }
  );
};

export const createMockContactResponse = (
  newContact: ContactInput
): Contact => {
  const id = faker.number.int();

  return {
    id,
    ...newContact,
    createdAt: new Date(Date.now()).toISOString(),
  };
};

export function renderWithChakraProvider(
  ui: React.ReactElement,
  renderOptions?: RenderOptions
) {
  return render(
    <ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>,
    renderOptions
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    api,
    ...renderOptions
  }: {
    api: IContactsAPI;
  } & RenderOptions
) {
  return render(
    React.createElement(ChakraProvider, {
      value: defaultSystem,
      children: React.createElement(ContactsApiProvider, { api, children: ui }),
    }),
    renderOptions
  );
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
