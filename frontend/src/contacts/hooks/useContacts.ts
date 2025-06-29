import { useEffect, useState } from "react";
import { useContactsApi } from "../api/ContactsApiContext";
import { fetchContacts } from "../useCases";
import { ContactError } from "../../types";
import type { Contact } from "../../../../backend/src/domain/models/Contact";

export default function useContacts() {
  const contactsApi = useContactsApi();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchContacts(contactsApi);
        setContacts(data);
      } catch (error) {
        if (error instanceof ContactError) {
          setIsError(true);
        }
      }
    })();
  }, [contactsApi]);

  return {
    contacts,
    isError,
    hasNoContacts: contacts.length === 0,
  };
}
