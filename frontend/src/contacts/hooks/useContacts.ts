import { useQuery } from "@tanstack/react-query";

import { useContactsApi } from "api/ContactsApiContext";
import { fetchContacts } from "useCases";

export default function useContacts() {
  const contactsApi = useContactsApi();
  const {
    data: contacts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => await fetchContacts(contactsApi),
  });

  const hasNoContacts = contacts?.length === 0;

  return {
    contacts,
    isLoading,
    isError,
    hasNoContacts,
  };
}
