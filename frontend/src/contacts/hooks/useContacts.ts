import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { useContactsApi } from "api/ContactsApiContext";
import { fetchContacts } from "useCases";

export default function useContacts() {
  const navigate = useNavigate();
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

  const handleAddContact = () => {
    navigate("/create");
  };

  return {
    contacts,
    isLoading,
    isError,
    hasNoContacts,
    handleAddContact,
  };
}
