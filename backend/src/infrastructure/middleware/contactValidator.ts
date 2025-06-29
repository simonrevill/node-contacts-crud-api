import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod/v4";
import { ContactError } from "../../types";

export const contactIdValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactIdSchema = z.int({ error: "Invalid contact ID." });
  const contactId = parseInt(req.params.id);
  const result = contactIdSchema.safeParse(contactId);

  if (!result.success) {
    throw new ContactError({ status: 400, error: result.error.issues });
  }

  next();
};

export const contactValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactSchema = z.object({
    firstName: z
      .string("Expected firstName but received undefined.")
      .min(2, { error: "First name requires at least 2 characters." }),
    lastName: z
      .string("Expected lastName but received undefined.")
      .min(2, { error: "Last name requires at least 2 characters." }),
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? "Expected email but received undefined."
          : "Email provided has an incorrect format.",
    }),
  });
  const newContact = req.body;
  const result = contactSchema.safeParse(newContact);
  const isValidationError = !result.success;

  if (isValidationError) {
    throw new ContactError({ status: 400, error: result.error.issues });
  }

  next();
};
