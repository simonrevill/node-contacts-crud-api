import express, { type Express } from "express";
import cors from "cors";

import { createContactsRouter } from "./infrastructure/controllers";
import { errorHandler } from "./infrastructure/middleware";
import { type IContactsRepository } from "./types";

export function createApp(repository: IContactsRepository): Express {
  const contactsRouter = createContactsRouter(repository);

  const app = express()
    .use(cors())
    .use(express.json())
    .use("/api/contacts", contactsRouter)
    .use(errorHandler);

  return app;
}
