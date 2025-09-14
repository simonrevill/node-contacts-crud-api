import type { ComponentProps } from "react";
import { Heading } from "@chakra-ui/react";

import { Main } from "components";

type ContactsPageContainerProps = ComponentProps<"main">;

export default function ContactsPageContainer({
  children,
}: ContactsPageContainerProps) {
  return (
    <Main>
      <Heading as="h2" mb={8}>
        My Contacts
      </Heading>
      {children}
    </Main>
  );
}
