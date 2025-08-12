import { Box, Text } from "@chakra-ui/react";
import { LoaderCircle } from "lucide-react";

export default function FetchingContacts() {
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
      <LoaderCircle size={48} className="loading" aria-hidden />
      <Text
        role="status"
        aria-live="polite"
        fontWeight="semibold"
        textStyle="lg"
      >
        Fetching contacts...
      </Text>
    </Box>
  );
}
