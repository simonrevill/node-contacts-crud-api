import type { Contact } from "backend/domain/models";

import type { IContactsAPI } from "types";

export const fetchContacts = async (api: IContactsAPI): Promise<Contact[]> =>
  await api.fetchContacts();
