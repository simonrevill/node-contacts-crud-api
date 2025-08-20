import { NavLink } from "react-router";
import {
  Field,
  Input,
  Button,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";
import { X, Check, LoaderCircle } from "lucide-react";

import { useAddContactForm } from "hooks";

export default function AddContactForm() {
  const {
    Controller,
    control,
    getFieldState,
    isSubmitDisabled,
    isSubmitting,
    handleSubmit,
    onSubmit,
  } = useAddContactForm();

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <Field.Root invalid={fieldState.invalid} mb={6}>
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
        render={({ field, fieldState }) => (
          <Field.Root invalid={fieldState.invalid} mb={6}>
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
        render={({ field, fieldState }) => (
          <Field.Root invalid={fieldState.invalid} mb={12}>
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
