import { NavLink } from "react-router";

import { Field, Input, Button, Link as ChakraLink } from "@chakra-ui/react";
import { X, Check } from "lucide-react";

export default function AddContactForm() {
  return (
    <form>
      <Field.Root>
        <Field.Label htmlFor="firstName">First name</Field.Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
        />
      </Field.Root>
      <Field.Root>
        <Field.Label htmlFor="lastName">Last name</Field.Label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
        />
      </Field.Root>
      <Field.Root>
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
  );
}
