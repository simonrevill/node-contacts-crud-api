import {
  Box,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Plus, UserRoundX } from "lucide-react";
import { NavLink } from "react-router";

export default function NoContacts() {
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
      <ChakraLink asChild>
        <NavLink to="/create">
          <Button variant="solid" size="lg" colorScheme="teal">
            <Plus />
            Add contact
          </Button>
        </NavLink>
      </ChakraLink>
    </Box>
  );
}
