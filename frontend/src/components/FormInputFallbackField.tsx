import { FunctionComponent, useState } from "react";
import { useField, useFormikContext } from "formik";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";

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
    setFieldValue(name, e.target.value);
  };

  const handleBlur = () => {
    if (field.value === "") {
      mutation.mutate(
        { name, value: "" }, // this triggers reset to fallback logic
        {
          onSuccess: () => {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
          },
        }
      );
    } else {
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
