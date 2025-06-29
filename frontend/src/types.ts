import { z } from "zod/v4";

import type { Contact } from "../../backend/src/domain/models/Contact";

export interface IContactsAPI {
  fetchContacts(): Promise<Contact[]>;
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
