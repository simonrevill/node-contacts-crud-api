import type { ComponentProps } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";

import { Main } from "components";
import { useContacts } from "src/contacts/hooks";
import { Plus } from "lucide-react";

type ContactsPageContainerProps = ComponentProps<"main">;

export default function ContactsPageContainer({
  children,
}: ContactsPageContainerProps) {
  const { handleAddContact } = useContacts();

  return (
    <Main>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={8}
      >
        <Heading as="h2">My Contacts</Heading>
        <Button onClick={handleAddContact}>
          <Plus />
          Add contact
        </Button>
      </Box>
      {children}
    </Main>
  );
}
