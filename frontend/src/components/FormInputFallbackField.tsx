import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatNumberToGerman, parseGermanNumber } from "@utils/formatNumbers";
import { FunctionComponent, useEffect, useState } from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";

interface Props extends Omit<TextFieldProps, "name" | "variant"> {
  name: string;
  fallbackValue: number | string;
  hiddenLabel?: boolean;
}

const FormInputFallbackField: FunctionComponent<Props> = ({
  name,
  fallbackValue,
  hiddenLabel = false,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [justSaved, setJustSaved] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const mutation = useSaveFieldMutation();

  // Show fallback only when actual value is empty
  const effectiveValue =
    field.value === null || field.value === undefined || field.value === ""
      ? fallbackValue
      : field.value;

  useEffect(() => {
    if (typeof effectiveValue === "number") {
      setInputValue(formatNumberToGerman(effectiveValue));
    } else {
      setInputValue(effectiveValue?.toString() || "");
    }
  }, [effectiveValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/[^0-9,.\-]/g, ""); // Clean input for numbers
    setInputValue(val);
  };

  const handleBlur = () => {
    const parsed = parseGermanNumber(inputValue);

    if (inputValue === "" || parsed === null) {
      // Send empty string if field was cleared or couldn't parse
      setFieldValue(name, "");
      mutation.mutate(
        { name, value: "" },
        {
          onSuccess: () => {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
          },
        }
      );
    } else {
      // Send parsed number like 10000.3
      setFieldValue(name, parsed);
      mutation.mutate(
        { name, value: parsed },
        {
          onSuccess: () => {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
          },
        }
      );
      setInputValue(formatNumberToGerman(parsed));
    }
  };

  return (
    <TextField
      {...props}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      hiddenLabel={hiddenLabel}
      variant="filled"
      error={!!meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      sx={{
        ".MuiInputBase-input": {
          padding: "5px",
        },
      }}
      InputProps={{
        endAdornment: justSaved ? (
          <InputAdornment position="end">
            <CheckCircleIcon sx={{ color: "green" }} fontSize="small" />
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default FormInputFallbackField;
