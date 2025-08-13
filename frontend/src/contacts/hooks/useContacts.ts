import { useEffect, useState } from "react";
import { useContactsApi } from "../api/ContactsApiContext";
import { fetchContacts } from "../useCases";
import { ContactError } from "../../types";
import type { Contact } from "../../../../backend/src/domain/models";

export default function useContacts() {
  const contactsApi = useContactsApi();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchContacts(contactsApi);
        setContacts(data);
      } catch (error) {
        if (error instanceof ContactError) {
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [contactsApi]);

  const hasNoContacts = contacts.length === 0;

  return {
    contacts,
    isLoading,
    isError,
    hasNoContacts,
  };
}
