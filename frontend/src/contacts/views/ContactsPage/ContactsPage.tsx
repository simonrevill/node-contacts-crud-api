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
import type { ReactNode } from "react";

export default function ContactsPage() {
  const { contacts, isLoading, isError, hasNoContacts } = useContacts();

  if (isLoading) {
    return (
      <ContactsPageContainer>
        <FetchingContacts />
      </ContactsPageContainer>
    );
  }

  if (isError) {
    return (
      <ContactsPageContainer>
        <SomethingWentWrong />
      </ContactsPageContainer>
    );
  }

  if (hasNoContacts) {
    return (
      <ContactsPageContainer>
        <NoContacts />
      </ContactsPageContainer>
    );
  }

  return (
    <ContactsPageContainer>
      <ContactList>
        {contacts.map((contact) => (
          <ContactListItem key={contact.id}>
            {`${contact.firstName} ${contact.lastName}`}
          </ContactListItem>
        ))}
      </ContactList>
    </ContactsPageContainer>
  );
}

interface ContactsPageContainerProps {
  children: ReactNode;
}

function ContactsPageContainer({ children }: ContactsPageContainerProps) {
  return (
    <Main>
      <Heading as="h2" mb={8}>
        My Contacts
      </Heading>
      {children}
    </Main>
  );
}
