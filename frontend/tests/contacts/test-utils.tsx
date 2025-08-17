import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ContactsApiProvider } from "api/ContactsApiProvider";
import { faker } from "@faker-js/faker";
import type { IContactsAPI } from "types";
import type { Contact, ContactInput } from "backend/domain/models/Contact";
import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

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

type ProvidersOptions = {
  api?: IContactsAPI;
} & RenderOptions;

export function renderWithProviders(
  ui: React.ReactElement,
  { api, ...renderOptions }: ProvidersOptions = {}
) {
  const queryClientConfig: QueryClientConfig = {
    defaultOptions: { queries: { retry: false } },
  };
  const queryClient = new QueryClient(queryClientConfig);

  let tree = (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ChakraProvider>
      ;
    </QueryClientProvider>
  );

  if (api) {
    tree = (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <ContactsApiProvider api={api}>
            <MemoryRouter>{ui}</MemoryRouter>
          </ContactsApiProvider>
        </ChakraProvider>
      </QueryClientProvider>
    );
  }

  return render(tree, renderOptions);
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
