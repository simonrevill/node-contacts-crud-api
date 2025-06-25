import type { IContactsAPI } from "../../src/types";
import type { Contact } from "../../../backend/src/domain/models/Contact";
import { ContactError } from "shared";

export class FakeContactsAPI implements IContactsAPI {
  async fetchContacts(): Promise<Contact[]> {
    throw new ContactError({ status: 500, error: "Something went wrong." });
  }
}
