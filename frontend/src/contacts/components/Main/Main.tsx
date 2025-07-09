import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface MainProps {
  children?: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <Box
      as="main"
      p={4}
      h={`calc(100dvh - 4.75rem)`}
      display="flex"
      flexDir="column"
    >
      {children}
    </Box>
  );
}
