import type { IContactsAPI } from "@/types";
import type { Contact } from "../../../backend/src/domain/models/Contact";
import { ContactError } from "../../../backend/src/utils";

export class FakeContactsAPI implements IContactsAPI {
  async fetchContacts(): Promise<Contact[]> {
    throw new ContactError({ status: 500, error: "Something went wrong." });
  }
}
