import type { ReactNode } from "react";
import { List } from "@chakra-ui/react";

interface ContactListProps {
  children?: ReactNode;
}

export default function ContactList({ children }: ContactListProps) {
  return (
    <List.Root
      as="ul"
      listStyle="none"
      borderWidth={0.25}
      borderStyle="solid"
      borderColor="gray.300"
      borderRadius={4}
    >
      {children}
    </List.Root>
  );
}
