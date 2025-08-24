import React, { type ReactNode } from "react";
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
import z from "zod";
import { useForm, type Control, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const queryClientTestConfig: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  };
  const queryClient = new QueryClient(queryClientTestConfig);

  let tree = (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ChakraProvider>
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

export const firstNameSchema = z.object({
  firstName: z
    .string("First name is required.")
    .min(2, { message: "First name requires at least 2 characters." }),
});

export const emailSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.input === "") {
        return "Email is required.";
      }
      return "Email provided has an incorrect format.";
    },
  }),
});

export const testFormSchema = z
  .object({})
  .extend({ ...firstNameSchema.shape, ...emailSchema.shape });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFormComponent<T extends z.ZodType<any, any, any>>(
  schema: T
) {
  return function FormComponent({
    defaultValues,
    children,
  }: {
    defaultValues?: DefaultValues<z.input<T>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (control: Control<z.input<T>, any>) => ReactNode;
  }) {
    const { control } = useForm<z.input<T>>({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(schema) as any,
      defaultValues,
      mode: "all",
    });

    return (
      <form>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {children(control as Control<z.input<T>, any>)}
      </form>
    );
  };
}
