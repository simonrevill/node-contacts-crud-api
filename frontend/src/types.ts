import { z } from "zod";

import type { Contact, ContactInput } from "backend/domain/models";

export interface IContactsAPI {
  fetchContacts(): Promise<Contact[]>;
  createContact(newContact: ContactInput): Promise<Response>;
}

export interface ContactErrorConstructor {
  code?: string;
  status: number;
  error: string | z.core.$ZodIssue[];
}

export class ContactError extends Error {
  code?: string;
  status: number;
  error: string | z.core.$ZodIssue[];

  constructor({ code, status, error }: ContactErrorConstructor) {
    super();
    this.code = code;
    this.status = status;
    this.error = error;
  }
}

export interface CreateContactResponse {
  status: number;
  contact: Contact;
  location: string;
}
