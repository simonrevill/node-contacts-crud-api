import { Box, IconButton, Heading } from "@chakra-ui/react";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <Box as="header" p={4} display="flex" alignItems="center" gap={4}>
      <IconButton
        aria-label="Menu"
        variant="ghost"
        aria-expanded="false"
        w={11}
        h={11}
      >
        <Menu size={24} />
      </IconButton>
      <Heading as="h1" size="xl" fontWeight="bold">
        Contacts Manager
      </Heading>
    </Box>
  );
}
