import React, { FunctionComponent, useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  FormControl,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";

interface FormInputFieldProps extends Omit<TextFieldProps, "name" | "variant"> {
  name: string;
  required?: boolean;
}

const FormInputSaveField: FunctionComponent<FormInputFieldProps> = ({
  name,
  type = "text",
  required = false,
  disabled = false,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [justSaved, setJustSaved] = useState(false);

  const mutation = useSaveFieldMutation();

  const handleBlur = () => {
    // Only send update if value is non-empty (optional)
    if (field.value !== undefined && field.value !== "") {
      mutation.mutate(
        { name, value: field.value },
        {
          onSuccess: () => {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
          },
        }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value);
  };

  const configTextField: TextFieldProps = {
    ...field,
    ...props,
    fullWidth: true,
    type,
    required,
    disabled,
    onChange: handleChange,
    onBlur: handleBlur,
    error: !!meta.touched && !!meta.error,
    helperText: meta.touched && meta.error ? meta.error : undefined,
    variant: "filled",
    InputProps: {
      endAdornment: justSaved ? (
        <InputAdornment position="end">
          <CheckCircleIcon sx={{ color: "green" }} fontSize="small" />
        </InputAdornment>
      ) : undefined,
    },
  };

  return (
    <FormControl fullWidth variant="outlined">
      <TextField {...configTextField} />
    </FormControl>
  );
};

export default FormInputSaveField;
