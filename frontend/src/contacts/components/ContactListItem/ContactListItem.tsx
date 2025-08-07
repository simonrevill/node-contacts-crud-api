import type { ReactNode } from "react";
import { List, Text } from "@chakra-ui/react";

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
       <Text as="span" fontSize="md" fontWeight="semibold">
        {children}
       </Text>
    </List.Item>
  );
}
