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
import ListSubheader from "@mui/material/ListSubheader";

interface BaseOption {
  label: string;
  value: any;
}

interface GroupedOption {
  group: string;
  options: BaseOption[];
}

type OptionType = BaseOption | GroupedOption;

interface FormSelectFieldProps {
  name: string;
  label: string;
  options: OptionType[];
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
        value={
          options
            .flatMap((opt) => ("group" in opt ? opt.options : [opt]))
            .some((opt) => opt.value === field.value)
            ? field.value
            : ""
        }
        onChange={handleChange}
        disabled={disabled}
        endAdornment={
          justSaved && (
            <InputAdornment position="end">
              <CheckCircleIcon sx={{ color: "green" }} />
            </InputAdornment>
          )
        }
      >
        {options.flatMap((opt) =>
          "group" in opt
            ? [
                <ListSubheader key={`group-${opt.group}`}>
                  {opt.group}
                </ListSubheader>,
                ...opt.options.map((subOpt) => (
                  <MenuItem key={subOpt.value} value={subOpt.value}>
                    {subOpt.label}
                  </MenuItem>
                )),
              ]
            : [
                <MenuItem
                  key={(opt as BaseOption).value}
                  value={(opt as BaseOption).value}
                >
                  {(opt as BaseOption).label}
                </MenuItem>,
              ]
        )}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelectSaveField;
