import { FunctionComponent, useState } from "react";
import { useField, useFormikContext } from "formik";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";
import { parseGermanNumber } from "@utils/formatNumbers";

interface Props extends Omit<TextFieldProps, "name" | "variant"> {
  name: string;
  fallbackValue: number | string;
}

const FormInputFallbackField: FunctionComponent<Props> = ({
  name,
  fallbackValue,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [justSaved, setJustSaved] = useState(false);
  const mutation = useSaveFieldMutation();

  // Show fallback only when actual value is empty
  const displayValue =
    field.value === null || field.value === undefined || field.value === ""
      ? fallbackValue
      : field.value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Optional: Remove all non-numeric (except comma, dot and minus)
    val = val.replace(/[^0-9,.\-]/g, "");

    // Keep input as-is for now
    setFieldValue(name, val);
  };

  const handleBlur = () => {
    if (field.value === "") {
      mutation.mutate(
        { name, value: "" }, // Reset to fallback
        {
          onSuccess: () => {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
          },
        }
      );
    } else {
      const parsedValue = parseGermanNumber(field.value);
      if (parsedValue !== null) {
        mutation.mutate(
          { name, value: parsedValue },
          {
            onSuccess: () => {
              setJustSaved(true);
              setTimeout(() => setJustSaved(false), 2000);
            },
          }
        );
      }
    }
  };

  return (
    <TextField
      {...props}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      fullWidth
      variant="filled"
      error={!!meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
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
