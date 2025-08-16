import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ContactsApiProvider } from "api/ContactsApiProvider";
import { faker } from "@faker-js/faker";
import type { IContactsAPI } from "types";
import type { Contact, ContactInput } from "backend/domain/models/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  let tree = (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>;
    </QueryClientProvider>
  );

  if (api) {
    tree = (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <ContactsApiProvider api={api}>{ui}</ContactsApiProvider>
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
