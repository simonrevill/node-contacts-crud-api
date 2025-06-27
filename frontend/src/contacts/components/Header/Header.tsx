import { Box, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box as="header" p={4}>
      <Heading as="h1" size="xl">
        Contacts Manager
      </Heading>
    </Box>
  );
}
