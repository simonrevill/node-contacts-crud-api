import type { Contact } from "backend/domain/models/Contact";

import type { IContactsAPI } from "types";

export const fetchContacts = async (api: IContactsAPI): Promise<Contact[]> =>
  await api.fetchContacts();
