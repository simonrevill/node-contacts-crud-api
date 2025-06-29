import { type IContactsAPI, ContactError } from "../../types";
import type { Contact } from "../../../../backend/src/domain/models/Contact";

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
  };
};
