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
import { parseGermanNumber } from "@utils/formatNumbers";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Optional: Remove all non-numeric (except comma, dot and minus)
    val = val.replace(/[^0-9,.\-]/g, "");

    // Keep input as-is for now
    setFieldValue(name, val);
  };

  const handleBlur = () => {
    const parsed = parseGermanNumber(field.value);
    if (parsed !== null) {
      mutation.mutate(
        { name, value: parsed },
        {
          onSuccess: () => {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
          },
        }
      );
    }
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
      <TextField
        {...configTextField}
        sx={{
          "& .MuiInputLabel-root. Mui-disabled": {
            color: "black",
          },
        }}
      />
    </FormControl>
  );
};

export default FormInputSaveField;
