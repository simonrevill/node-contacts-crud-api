import { Pool } from "pg";

import { createApp } from "./app";
import { ContactsRepository } from "./infrastructure/repositories";

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  port: process.env.DB_PORT as unknown as number,
  password: process.env.DB_PASSWORD,
});

const contactsRepository = new ContactsRepository(pool);
const app = createApp(contactsRepository);
const SERVER_PORT = process.env.SERVER_PORT || 8080;

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on port ${SERVER_PORT}...`)
);
