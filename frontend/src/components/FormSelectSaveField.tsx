import { FunctionComponent, useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";

interface FormSelectFieldProps {
  name: string;
  label: string;
  options: { label: string; value: any }[];
  required?: boolean;
  disabled?: boolean;
  onSaved?: () => void;
}

const FormSelectSaveField: FunctionComponent<FormSelectFieldProps> = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  onSaved,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [justSaved, setJustSaved] = useState(false);

  const mutation = useSaveFieldMutation();

  const handleChange = (event: SelectChangeEvent<any>) => {
    const newValue = event.target.value;
    setFieldValue(name, newValue);

    mutation.mutate(
      { name, value: newValue },
      {
        onSuccess: () => {
          setJustSaved(true);
          setTimeout(() => setJustSaved(false), 2000);
          onSaved?.();
        },
      }
    );
  };

  return (
    <FormControl
      fullWidth
      variant="filled"
      error={!!meta.touched && !!meta.error}
    >
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        {...field}
        value={field.value}
        onChange={handleChange}
        disabled={disabled}
        endAdornment={
          justSaved ? (
            <InputAdornment position="end">
              <CheckCircleIcon sx={{ color: "green" }} />
            </InputAdornment>
          ) : undefined
        }
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

export default FormSelectSaveField;
