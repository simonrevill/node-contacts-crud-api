import { Box, List, Text } from "@chakra-ui/react";
import { NoContacts } from "../../components";
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
      <List.Root
        as="ul"
        listStyle="none"
        borderWidth={0.25}
        borderStyle="solid"
        borderColor="gray.300"
        borderRadius={2}
      >
        {contacts.map((contact) => (
          <List.Item
            key={contact.id}
            p={4}
            borderBottomWidth={0.25}
            borderBottomStyle="solid"
            borderBottomColor="gray.300"
            _last={{ borderBottom: "none" }}
          >
            <Text as="span" fontSize="md" fontWeight="semibold">
              {`${contact.firstName} ${contact.lastName}`}
            </Text>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
