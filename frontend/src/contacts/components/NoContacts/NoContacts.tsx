import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Plus, UserRoundX } from "lucide-react";

interface NoContactsProps {
  onAddContact?: () => void;
}

export default function NoContacts({ onAddContact }: NoContactsProps) {
  return (
    <Box
      display="flex"
      flexDir="column"
      gap={4}
      flex={1}
      justifyContent="center"
      alignItems="center"
      role="alert"
    >
      <UserRoundX
        size={48}
        color="var(--chakra-colors-fg-subtle)"
        aria-label="No contacts icon"
      />
      <Heading as="h2" fontSize="md" fontWeight="semibold">
        No Contacts
      </Heading>
      <Text fontSize="sm">Add a contact to get started</Text>
      <Button
        variant="solid"
        size="lg"
        colorScheme="teal"
        onClick={onAddContact}
      >
        <Plus />
        Add contact
      </Button>
    </Box>
  );
}
