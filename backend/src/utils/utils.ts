import { z } from "zod/v4";

import { type ContactErrorConstructor } from "../types";

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
