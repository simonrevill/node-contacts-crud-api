import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import z from "zod/v4";

export default function useAddContactForm() {
  const addContactFormSchema = z.object({
    firstName: z
      .string()
      .nonempty("First name is required.")
      .min(2, { message: "First name requires at least 2 characters." }),
    lastName: z
      .string()
      .nonempty("Last name is required.")
      .min(2, { message: "Last name requires at least 2 characters." }),
    email: z.email({
      error: (issue) => {
        if (issue.input === "") {
          return "Email is required.";
        }
        return "Email provided has an incorrect format.";
      },
    }),
  });

  type AddContactFormData = z.infer<typeof addContactFormSchema>;

  const {
    control,
    formState: { errors, isValid },
    getFieldState,
  } = useForm<AddContactFormData>({
    resolver: zodResolver(addContactFormSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
    mode: "all",
  });

  return {
    Controller,
    control,
    getFieldState,
    isFirstNameInvalid: !!errors.firstName,
    isLastNameInvalid: !!errors.lastName,
    isEmailInvalid: !!errors.email?.message,
    isSubmitDisabled: !isValid,
  };
}
