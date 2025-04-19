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
import { textFields } from "@utils/textFields";

interface FormInputFieldProps extends Omit<TextFieldProps, "name" | "variant"> {
  name: string;
  required?: boolean;
  numeric?: boolean;
  onSaved?: () => void;
}

const FormInputSaveField: FunctionComponent<FormInputFieldProps> = ({
  name,
  type = "text",
  required = false,
  disabled = false,
  numeric = false,
  onSaved,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [justSaved, setJustSaved] = useState(false);

  const mutation = useSaveFieldMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (numeric) {
      val = val.replace(/[^0-9,.\-]/g, "");
    }
    setFieldValue(name, val);
  };

  const handleBlur = () => {
    if (textFields.includes(name)) {
      // For string-based fields
      mutation.mutate(
        { name, value: field.value },
        {
          onSuccess: () => {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
            onSaved?.();
          },
        }
      );
    } else {
      // For numeric fields
      const parsed = parseGermanNumber(field.value);
      if (parsed !== null) {
        mutation.mutate(
          { name, value: parsed },
          {
            onSuccess: () => {
              setJustSaved(true);
              setTimeout(() => setJustSaved(false), 2000);
              onSaved?.();
            },
          }
        );
      }
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
