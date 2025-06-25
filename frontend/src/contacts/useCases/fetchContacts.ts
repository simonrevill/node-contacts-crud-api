import type { IContactsAPI } from "@/types";
import type { Contact } from "../../../../backend/src/domain/models/Contact";

export const fetchContacts = async (api: IContactsAPI): Promise<Contact[]> =>
  await api.fetchContacts();
