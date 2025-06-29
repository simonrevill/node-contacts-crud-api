import { Text } from "@chakra-ui/react";
import {
  ContactList,
  ContactListItem,
  Main,
  NoContacts,
} from "../../components";
import useContacts from "../../hooks/useContacts";

export default function ContactsPage() {
  const { contacts, isError, hasNoContacts } = useContacts();

  if (isError) {
    return (
      <Main>
        <div role="alert">
          <h2>Something went wrong.</h2>
          <p>Please try again later</p>
        </div>
      </Main>
    );
  }

  if (hasNoContacts) {
    return (
      <Main>
        <NoContacts />
      </Main>
    );
  }

  return (
    <Main>
      <ContactList>
        {contacts.map((contact) => (
          <ContactListItem key={contact.id}>
            <Text as="span" fontSize="md" fontWeight="semibold">
              {`${contact.firstName} ${contact.lastName}`}
            </Text>
          </ContactListItem>
        ))}
      </ContactList>
    </Main>
  );
}
