import React, { FunctionComponent, useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  FormControl,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";
import { parseGermanNumber, formatNumberToGerman } from "@utils/formatNumbers";

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
  const [inputValue, setInputValue] = useState(field.value || "");

  const mutation = useSaveFieldMutation();

  useEffect(() => {
    // Update visible input based on formik value
    if (numeric && typeof field.value === "number") {
      setInputValue(formatNumberToGerman(field.value));
    } else if (!numeric) {
      setInputValue(field.value || "");
    }
  }, [field.value, numeric]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (numeric) {
      val = val.replace(/[^0-9,.\-]/g, ""); // Allow numbers, dots, commas, and minus
    }

    setInputValue(val);
  };

  const handleBlur = () => {
    let valueToSave: string | number = inputValue;

    if (numeric) {
      const parsed = parseGermanNumber(inputValue);
      if (parsed === null) {
        setFieldValue(name, inputValue); // Still update formik with invalid input
        return;
      }
      valueToSave = parsed;
    }

    setFieldValue(name, valueToSave);

    mutation.mutate(
      { name, value: valueToSave },
      {
        onSuccess: () => {
          setJustSaved(true);
          setTimeout(() => setJustSaved(false), 2000);
          onSaved?.();
        },
      }
    );

    // Reformat the field after saving
    if (numeric && typeof valueToSave === "number") {
      setInputValue(formatNumberToGerman(valueToSave));
    }
  };

  return (
    <FormControl fullWidth variant="outlined">
      <TextField
        {...props}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        type={type}
        required={required}
        disabled={disabled}
        error={!!meta.touched && !!meta.error}
        helperText={meta.touched && meta.error ? meta.error : undefined}
        variant="filled"
        InputProps={{
          endAdornment: justSaved ? (
            <InputAdornment position="end">
              <CheckCircleIcon sx={{ color: "green" }} fontSize="small" />
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          "& .MuiInputLabel-root.Mui-disabled": {
            color: "black",
          },
        }}
      />
    </FormControl>
  );
};

export default FormInputSaveField;
