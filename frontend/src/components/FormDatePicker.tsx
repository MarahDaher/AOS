import { FunctionComponent } from "react";
import { useField, useFormikContext } from "formik";
import { FormControl } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";

interface FormDatePickerProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  views?: Array<"year" | "month" | "day">;
  format?: string;
  slotProps?: DatePickerProps<any>["slotProps"];
}

const FormDatePicker: FunctionComponent<FormDatePickerProps> = ({
  name,
  label,
  required = false,
  disabled = false,
  views = ["year", "month", "day"],
  format = "dd. MMMM yyyy",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const mutation = useSaveFieldMutation();

  const currentError = meta.touched && meta.error ? meta.error : "";

  const handleSave = (isoString: string | null) => {
    if (isoString) {
      mutation.mutate(
        { name, value: isoString },
        {
          onSuccess: () => {},
        }
      );
    }
  };

  const handleChange = (date: Date | null) => {
    const isoString = date ? date.toISOString() : null;
    setFieldValue(name, isoString);
    handleSave(isoString);
  };

  return (
    <FormControl fullWidth>
      <DatePicker
        label={label}
        value={field.value ? new Date(field.value) : null}
        onChange={handleChange}
        disabled={disabled}
        views={views}
        format={format}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "filled",
            required,
            error: !!currentError,
            helperText: currentError,
          },
        }}
      />
    </FormControl>
  );
};

export default FormDatePicker;
