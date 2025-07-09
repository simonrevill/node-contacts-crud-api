import { NavLink } from "react-router";
import {
  Field,
  Input,
  Button,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";
import { X, Check } from "lucide-react";

import { useAddContactForm } from "hooks";

export default function AddContactForm() {
  const {
    Controller,
    control,
    getFieldState,
    isFirstNameInvalid,
    isLastNameInvalid,
    isEmailInvalid,
    isSubmitDisabled,
  } = useAddContactForm();

  return (
    <Box as="form">
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <Field.Root invalid={isFirstNameInvalid}>
            <Field.Label htmlFor="firstName">First name</Field.Label>
            <Input
              {...field}
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
            />
            <Field.ErrorText role="alert">
              {getFieldState("firstName").error?.message}
            </Field.ErrorText>
          </Field.Root>
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <Field.Root invalid={isLastNameInvalid}>
            <Field.Label htmlFor="lastName">Last name</Field.Label>
            <Input
              {...field}
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
            />
            <Field.ErrorText role="alert">
              {getFieldState("lastName").error?.message}
            </Field.ErrorText>
          </Field.Root>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Field.Root invalid={isEmailInvalid}>
            <Field.Label htmlFor="email">Email</Field.Label>
            <Input
              {...field}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
            />
            <Field.ErrorText role="alert">
              {getFieldState("email").error?.message}
            </Field.ErrorText>
          </Field.Root>
        )}
      />
      <ChakraLink asChild>
        <NavLink to="/">
          <Button variant="outline">
            <X />
            Cancel
          </Button>
        </NavLink>
      </ChakraLink>
      <Button type="submit" variant="solid" disabled={isSubmitDisabled}>
        <Check />
        Submit
      </Button>
    </Box>
  );
}
