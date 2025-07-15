import { type IContactsAPI, ContactError } from "types";
import type { Contact, ContactInput } from "backend/domain/models";

interface ContactsApiAdapterOptions {
  request?: typeof window.fetch;
}

export const createContactsApiAdapter = ({
  request = window.fetch,
}: ContactsApiAdapterOptions = {}): IContactsAPI => {
  return {
    async fetchContacts(): Promise<Contact[]> {
      const response = await request("http://localhost:8080/api/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      }

      throw new ContactError({ status: 500, error: "Something went wrong." });
    },
    async createContact(newContact: ContactInput): Promise<Response> {
      const response = await request("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      return response;
    },
  };
};
