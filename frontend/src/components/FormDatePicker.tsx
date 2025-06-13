import { FunctionComponent } from "react";
import { useField, useFormikContext } from "formik";
import { FormControl } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useSaveFieldMutation } from "@hooks/useSaveFieldMutation";
import { format, parseISO, isValid } from "date-fns";

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
  format: displayFormat = "dd. MMMM yyyy",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const mutation = useSaveFieldMutation();

  const currentError = meta.touched && meta.error ? meta.error : "";

  const handleSave = (dateString: string | null) => {
    if (dateString) {
      mutation.mutate(
        { name, value: dateString },
        {
          onSuccess: () => {},
        }
      );
    }
  };

  const handleChange = (date: Date | null) => {
    // Store only the date part in YYYY-MM-DD format
    const dateString =
      date && isValid(date) ? format(date, "yyyy-MM-dd") : null;
    setFieldValue(name, dateString);
    handleSave(dateString);
  };

  // Parse the value as a local date
  const parsedValue = field.value ? parseISO(field.value) : null;

  return (
    <FormControl fullWidth>
      <DatePicker
        label={label}
        value={parsedValue && isValid(parsedValue) ? parsedValue : null}
        onChange={handleChange}
        disabled={disabled}
        views={views}
        format={displayFormat}
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
