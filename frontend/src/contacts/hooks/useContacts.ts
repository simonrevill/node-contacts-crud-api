import { useEffect, useState } from "react";
import { useContactsApi } from "../api/ContactsApiContext";
import { fetchContacts } from "../useCases";
import { ContactError } from "shared";

export default function useContacts() {
  const contactsApi = useContactsApi();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchContacts(contactsApi);
      } catch (error) {
        if (error instanceof ContactError) {
          setIsError(true);
        }
        console.error(error);
      }
    })();
  }, [contactsApi]);

  return {
    isError,
  };
}
