import { Box, Text } from "@chakra-ui/react";
import { ContactList, ContactListItem, NoContacts } from "../../components";
import useContacts from "../../hooks/useContacts";

export default function ContactsPage() {
  const { contacts, isError, hasNoContacts } = useContacts();

  if (isError) {
    return (
      <Box as="main" p={4}>
        <div role="alert">
          <h2>Something went wrong.</h2>
          <p>Please try again later</p>
        </div>
      </Box>
    );
  }

  if (hasNoContacts) {
    return (
      <Box as="main" p={4}>
        <NoContacts />
      </Box>
    );
  }

  return (
    <Box as="main" p={4}>
      <ContactList>
        {contacts.map((contact) => (
          <ContactListItem key={contact.id}>
            <Text as="span" fontSize="md" fontWeight="semibold">
              {`${contact.firstName} ${contact.lastName}`}
            </Text>
          </ContactListItem>
        ))}
      </ContactList>
    </Box>
  );
}
