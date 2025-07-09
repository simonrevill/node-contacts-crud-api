import type { ContactInput } from "backend/domain/models/Contact";

import type { IContactsAPI, CreateContactResponse } from "types";

export const createContact = async (
  api: IContactsAPI,
  newContact: ContactInput
): Promise<CreateContactResponse> => {
  const response = await api.createContact(newContact);

  const status = response.status;
  const contact = await response.json();
  const location = response.headers.get("location")!;

  return {
    status,
    contact,
    location,
  };
};
