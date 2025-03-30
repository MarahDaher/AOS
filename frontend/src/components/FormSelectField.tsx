import { FunctionComponent } from "react";
import { useField } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";

interface FormSelectFieldProps {
  name: string;
  label: string;
  options: { label: string; value: number }[];
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: SelectChangeEvent<any>) => void;
}

const FormSelectField: FunctionComponent<FormSelectFieldProps> = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  onChange,
}) => {
  const [field, meta] = useField(name);

  return (
    <FormControl
      fullWidth
      variant="filled"
      error={!!meta.touched && !!meta.error}
    >
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        {...field}
        onChange={onChange || field.onChange}
        disabled={disabled}
        value={field.value}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelectField;
