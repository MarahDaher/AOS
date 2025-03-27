import React, { FunctionComponent } from "react";
import { useField, useFormikContext } from "formik";
import { FormControl } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

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

  const currentError = meta.touched && meta.error ? meta.error : "";

  return (
    <FormControl fullWidth>
      <DatePicker
        label={label}
        value={field.value ? new Date(field.value) : null}
        onChange={(date) => {
          setFieldValue(name, date ? date.toISOString() : null);
        }}
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
