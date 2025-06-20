import {
  type ErrorRequestHandler,
  type Request,
  type Response,
  type NextFunction,
} from "express";

import { ContactError } from "../../utils";
import { UNIQUE_VIOLATION } from "../../constants";

export const errorHandler: ErrorRequestHandler = (
  err: ContactError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let status = err.status >= 400 ? err.status : 500;
  const error = status === 500 ? "Something went wrong." : err.error;
  const response = { status, error };

  if (err.code === UNIQUE_VIOLATION) {
    status = 409;
    response.status = 409;
    response.error = "Email address is not unique.";
  }

  res.status(status).json(response);
};
