import { Field, Input } from "@chakra-ui/react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
type InputType = "text" | "email";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  type?: InputType;
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  placeholder: string;
}

export default function FormField<
  TFieldValues extends FieldValues = FieldValues
>({
  type = "text",
  name,
  label,
  control,
  placeholder,
}: FormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root invalid={fieldState.invalid} mb={6}>
          <Field.Label htmlFor={name}>{label}</Field.Label>
          <Input
            {...field}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
          />
          <Field.ErrorText role="alert">
            {fieldState.error?.message}
          </Field.ErrorText>
        </Field.Root>
      )}
    />
  );
}
