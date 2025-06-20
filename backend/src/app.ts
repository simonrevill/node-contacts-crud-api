import express, { type Express } from "express";

import { createContactsRouter } from "./infrastructure/controllers";
import { errorHandler } from "./infrastructure/middleware";
import { type IContactsRepository } from "./types";

export function createApp(repository: IContactsRepository): Express {
  const contactsRouter = createContactsRouter(repository);

  const app = express()
    .use(express.json())
    .use("/api/contacts", contactsRouter)
    .use(errorHandler);

  return app;
}
