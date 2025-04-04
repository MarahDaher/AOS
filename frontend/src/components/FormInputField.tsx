import { FunctionComponent } from "react";
import { useField } from "formik";
import { FormControl, TextField, TextFieldProps } from "@mui/material";

interface FormInputFieldProps extends Omit<TextFieldProps, "name" | "variant"> {
  name: string;
  required?: boolean;
}

const FormInputField: FunctionComponent<FormInputFieldProps> = ({
  name,
  type = "text",
  required = false,
  disabled = false,
  value,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(name);

  const configTextField: TextFieldProps = {
    ...field,
    ...props,
    fullWidth: true,
    type,
    required,
    disabled,
    onChange: onChange || field.onChange,
    error: !!meta.touched && !!meta.error,
    helperText: meta.touched && meta.error ? meta.error : undefined,
    value: value ?? field.value,
    variant: "filled",
  };

  return (
    <FormControl fullWidth variant="outlined">
      <TextField {...configTextField} />
    </FormControl>
  );
};

export default FormInputField;
