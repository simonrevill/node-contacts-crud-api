import {
  ContactList,
  ContactListItem,
  FetchingContacts,
  NoContacts,
  SomethingWentWrong,
  ContactsPageContainer,
} from "components";
import { useContacts } from "hooks";

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
