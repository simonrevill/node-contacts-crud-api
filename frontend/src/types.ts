import type { Contact } from "../../backend/src/domain/models/Contact";

export interface IContactsAPI {
  fetchContacts(): Promise<Contact[]>;
}
