import { Heading } from "@chakra-ui/react";

import { ContactList, ContactListItem, Main, NoContacts } from "components";
import { useContacts } from "hooks";

export default function ContactsPage() {
  const { contacts, isError, hasNoContacts } = useContacts();

  if (isError) {
    return (
      <Main>
        <Heading as="h2" mb={8}>
          My Contacts
        </Heading>
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
