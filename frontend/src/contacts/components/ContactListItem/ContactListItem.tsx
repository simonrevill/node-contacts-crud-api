import type { ReactNode } from "react";
import { List } from "@chakra-ui/react";

interface ContactListItemProps {
  children?: ReactNode;
}

export default function ContactListItem({ children }: ContactListItemProps) {
  return (
    <List.Item
      p={4}
      borderBottomWidth="0.0156rem"
      borderBottomStyle="solid"
      borderBottomColor="gray.300"
      _last={{ borderBottom: "none" }}
    >
      {children}
    </List.Item>
  );
}
