import { Pool } from "pg";
import { z } from "zod/v4";

import { type Contact, type ContactInput } from "./domain/models/Contact";
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

export interface IContactsRepository {
  pool?: Pool;
  getAllContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact>;
  createContact(contact: ContactInput): Promise<Contact | undefined>;
  updateContact(id: number, contact: ContactInput): Promise<Contact>;
  deleteContact(id: number): Promise<void>;
}

export type HTTPRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ContactErrorConstructor {
  code?: string;
  status: number;
  error: string | z.core.$ZodIssue[];
}
