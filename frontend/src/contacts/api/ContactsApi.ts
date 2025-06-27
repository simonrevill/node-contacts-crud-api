import { ContactError } from "shared";
import type { IContactsAPI } from "../../types";
import type { Contact } from "../../../../backend/src/domain/models/Contact";

export class ContactsApi implements IContactsAPI {
  async fetchContacts(): Promise<Contact[]> {
    try {
      const response = await fetch("http://localhost:8080/api/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      return result;
    } catch {
      throw new ContactError({ status: 500, error: "Something went wrong." });
    }
  }
}
