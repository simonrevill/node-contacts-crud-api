import { Pool } from "pg";

import { type IContactsRepository } from "../../types";
import { type Contact, type ContactInput } from "../../domain/models";
import { ContactError } from "../../types";

export class ContactsRepository implements IContactsRepository {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllContacts(): Promise<Contact[]> {
    const result = await this.pool.query<Contact>("SELECT * FROM contacts");

    const allContacts = result.rows;

    return allContacts;
  }

  async getContact(id: number): Promise<Contact> {
    const result = await this.pool.query<Contact>(
      `SELECT * FROM contacts WHERE id = $1`,
      [id]
    );

    const isEmptyContactList = !result.rows.length;

    if (isEmptyContactList) {
      throw new ContactError({ status: 404, error: "Contact not found." });
    }

    const foundContact = result.rows[0];

    return foundContact;
  }

  async createContact({
    firstName,
    lastName,
    email,
  }: Omit<Contact, "id">): Promise<Contact | undefined> {
    const result = await this.pool.query(
      `INSERT INTO contacts ("firstName", "lastName", email) VALUES ($1, $2, $3) RETURNING *`,
      [firstName, lastName, email]
    );

    return result.rows[0];
  }

  async updateContact(id: number, contact: ContactInput): Promise<Contact> {
    const { firstName, lastName, email } = contact;

    const result = await this.pool.query(
      'UPDATE contacts SET "firstName"=$1, "lastName"=$2, email=$3 WHERE id=$4 RETURNING *',
      [firstName, lastName, email, id]
    );

    const noContactFound = !result.rows.length;

    if (noContactFound) {
      throw new ContactError({ status: 404, error: "Contact not found." });
    }

    return result.rows[0];
  }

  async deleteContact(id: number): Promise<void> {
    const result = await this.pool.query(
      "DELETE FROM contacts WHERE id=$1 RETURNING *",
      [id]
    );

    const noContactFound = !result.rows.length;

    if (noContactFound) {
      throw new ContactError({ status: 404, error: "Contact not found." });
    }
  }
}
