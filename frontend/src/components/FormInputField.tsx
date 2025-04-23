import { FunctionComponent } from "react";
import { useField } from "formik";
import { FormControl, TextField, TextFieldProps } from "@mui/material";
import { formatNumberToGerman } from "@utils/formatNumbers";

interface FormInputFieldProps extends Omit<TextFieldProps, "name" | "variant"> {
  name: string;
  required?: boolean;
  numeric?: boolean;
  hiddenLabel?: boolean;
}

const FormInputField: FunctionComponent<FormInputFieldProps> = ({
  name,
  type = "text",
  required = false,
  disabled = false,
  value,
  onChange,
  numeric = false,
  hiddenLabel = false,
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
    value: value ?? (numeric ? formatNumberToGerman(field.value) : field.value),
    variant: "filled",
    hiddenLabel: hiddenLabel,
  };

  return (
    <FormControl fullWidth variant="outlined">
      <TextField
        {...configTextField}
        sx={{
          ".MuiInputBase-input": {
            padding: hiddenLabel ? "5px" : null,
          },
        }}
      />
    </FormControl>
  );
};

export default FormInputField;
