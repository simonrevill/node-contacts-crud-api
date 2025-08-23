import { NavLink } from "react-router";
import { Button, Link as ChakraLink, Box } from "@chakra-ui/react";
import { X, Check, LoaderCircle } from "lucide-react";

import { useAddContactForm } from "hooks";
import { FormField } from "components";

export default function AddContactForm() {
  const { control, isSubmitDisabled, isSubmitting, onSubmit } =
    useAddContactForm();

  return (
    <Box as="form" onSubmit={onSubmit}>
      <FormField
        name="firstName"
        label="First name"
        control={control}
        placeholder="Enter your first name"
      />
      <FormField
        name="lastName"
        label="Last name"
        control={control}
        placeholder="Enter your last name"
      />
      <FormField
        type="email"
        name="email"
        label="Email"
        control={control}
        placeholder="Enter your email address"
      />
      <Box display="flex" justifyContent="flex-end" gap={4}>
        <ChakraLink asChild>
          <NavLink to="/">
            <Button variant="outline">
              <X />
              Cancel
            </Button>
          </NavLink>
        </ChakraLink>
        <Button type="submit" variant="solid" disabled={isSubmitDisabled}>
          {isSubmitting ? <LoaderCircle className="loading" /> : <Check />}
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}
