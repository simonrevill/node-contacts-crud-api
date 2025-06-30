import { NavLink } from "react-router";
import {
  Heading,
  Link as ChakraLink,
  Button,
  Field,
  Input,
} from "@chakra-ui/react";
import { Check, ChevronLeft, X } from "lucide-react";

import { Main } from "../../components";

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
      <form>
        <Field.Root>
          <Field.Label htmlFor="firstName">First name</Field.Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
          />
          <Field.Label htmlFor="lastName">Last name</Field.Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
          />
          <Field.Label htmlFor="email">Email</Field.Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
        </Field.Root>
        <ChakraLink asChild>
          <NavLink to="/">
            <Button variant="outline">
              <X />
              Cancel
            </Button>
          </NavLink>
        </ChakraLink>
        <Button type="submit" variant="solid">
          <Check />
          Submit
        </Button>
      </form>
    </Main>
  );
}
