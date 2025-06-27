import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import { ContactsApiProvider } from "../../src/contacts/api/ContactsApiProvider";
import { faker } from "@faker-js/faker";

import type { IContactsAPI } from "../../src/types";
import type { Contact } from "../../../backend/src/domain/models/Contact";

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

export function renderWithApi(
  ui: React.ReactElement,
  { api, ...renderOptions }: { api: IContactsAPI } & RenderOptions
) {
  return render(
    React.createElement(ContactsApiProvider, { api, children: ui }),
    renderOptions
  );
}

export function renderWithChakraProvider(
  ui: React.ReactElement,
  renderOptions?: RenderOptions
) {
  return render(
    React.createElement(ChakraProvider, { value: defaultSystem, children: ui }),
    renderOptions
  );
}
