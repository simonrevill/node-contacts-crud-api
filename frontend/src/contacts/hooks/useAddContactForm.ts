import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
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
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<AddContactFormData>({
    resolver: zodResolver(addContactFormSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
    mode: "all",
  });

  const onSubmit: SubmitHandler<AddContactFormData> = async (values) =>
    await new Promise((resolve) => {
      setTimeout(() => resolve(values), 50);
    });

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitDisabled: !isValid || isSubmitting,
    isSubmitting,
  };
}
