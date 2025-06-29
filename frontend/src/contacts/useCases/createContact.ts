import type {
  Contact,
  ContactInput,
} from "../../../../backend/src/domain/models/Contact";
import type { IContactsAPI } from "../../types";

export const createContact = async (
  api: IContactsAPI,
  newContact: ContactInput
): Promise<{ location: string; contact: Contact }> => {
  const response = await api.createContact(newContact);

  const contact = await response.json();
  const location = response.headers.get("location")!;

  return {
    contact,
    location,
  };
};
