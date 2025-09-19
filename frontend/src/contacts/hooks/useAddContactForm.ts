import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ContactInput } from "backend/domain/models";
import { useContactsApi } from "../api/ContactsApiContext";
import z from "zod/v4";
import { useNavigate } from "react-router";

export default function useAddContactForm() {
  const navigate = useNavigate();
  const contactsApi = useContactsApi();
  const mutation = useMutation({
    mutationFn: async (newContact: ContactInput) => {
      await contactsApi.createContact(newContact);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

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
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<AddContactFormData>({
    resolver: zodResolver(addContactFormSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
    mode: "all",
  });

  const onSubmitHandler: SubmitHandler<AddContactFormData> = async (values) =>
    await mutation.mutateAsync(values);

  const onSubmit = handleSubmit(onSubmitHandler);

  return {
    control,
    onSubmit,
    isSubmitDisabled: !isValid || isSubmitting,
    isSubmitting,
  };
}
