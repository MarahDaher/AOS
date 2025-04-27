import React, { FunctionComponent, useEffect, useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";

interface FormInputFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  required?: boolean;
  numeric?: boolean;
  onSaved?: () => void;
  hiddenLabel?: boolean;
  variant?: "standard" | "outlined" | "filled";
  alignText?: string;
}

const FormInputSaveField: FunctionComponent<FormInputFieldProps> = ({
  name,
  type = "text",
  required = false,
  disabled = false,
  numeric = false,
  hiddenLabel = false,
  variant = "filled",
  alignText,
  onSaved,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = useState(field.value || "");
  const [justSaved, setJustSaved] = useState(false);
  const navigate = useNavigate();
  const mutation = useSaveFieldMutation(navigate);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (numeric && typeof field.value === "number") {
      setInputValue(formatNumberToGerman(field.value));
    } else if (!numeric) {
      setInputValue(field.value || "");
    }
  }, [field.value, numeric]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (numeric) {
      val = val.replace(/[^0-9,.\-]/g, "");
    }

    setInputValue(val);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      saveField(val);
    }, 500); // Save after 500ms delay
  };

  const saveField = (value: string) => {
    let valueToSave: string | number = value;

    if (numeric) {
      const parsed = parseGermanNumber(value);
      if (parsed === null) {
        setFieldValue(name, value);
        return;
      }
      valueToSave = parsed;
    }

    const normalizedCurrentValue = numeric
      ? parseGermanNumber(field.value?.toString() || "")
      : field.value;

    if (valueToSave === normalizedCurrentValue) {
      return; // No change
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
        fullWidth
        type={type}
        required={required}
        hiddenLabel={hiddenLabel}
        disabled={disabled}
        error={!!meta.touched && !!meta.error}
        helperText={meta.touched && meta.error ? meta.error : undefined}
        variant={variant}
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
          ".MuiInputBase-input": {
            padding: hiddenLabel ? "5px" : null,
            textAlign: alignText ? alignText : null,
          },
        }}
      />
    </FormControl>
  );
};

export default FormInputSaveField;
