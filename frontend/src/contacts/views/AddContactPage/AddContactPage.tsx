import { NavLink } from "react-router";
import { Heading, Link as ChakraLink, Button } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";

import { AddContactForm, Main } from "components";

export default function AddContactPage() {
  return (
    <Main>
      <ChakraLink asChild>
        <NavLink to="/">
          <Button variant="outline">
            <ChevronLeft />
            Back
          </Button>
        </NavLink>
      </ChakraLink>
      <Heading as="h2">Add a contact</Heading>
      <AddContactForm />
    </Main>
  );
}
