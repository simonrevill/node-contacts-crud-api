import { Heading } from "@chakra-ui/react";

import {
  ContactList,
  ContactListItem,
  FetchingContacts,
  Main,
  NoContacts,
  SomethingWentWrong,
} from "components";
import { useContacts } from "hooks";

export default function ContactsPage() {
  const { contacts, isLoading, isError, hasNoContacts } = useContacts();

  if (isLoading) {
    return (
      <Main>
        <Heading as="h2" mb={8}>
          My Contacts
        </Heading>
        <FetchingContacts />
      </Main>
    );
  }

  if (isError) {
    return (
      <Main>
        <Heading as="h2" mb={8}>
          My Contacts
        </Heading>
        <SomethingWentWrong />
      </Main>
    );
  }

  if (hasNoContacts) {
    return (
      <Main>
        <Heading as="h2" mb={8}>
          My Contacts
        </Heading>
        <NoContacts />
      </Main>
    );
  }

  return (
    <Main>
      <Heading as="h2" mb={8}>
        My Contacts
      </Heading>
      <ContactList>
        {contacts.map((contact) => (
          <ContactListItem key={contact.id}>
            {`${contact.firstName} ${contact.lastName}`}
          </ContactListItem>
        ))}
      </ContactList>
    </Main>
  );
}
