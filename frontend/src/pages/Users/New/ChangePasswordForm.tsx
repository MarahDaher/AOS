import FormInputField from "@components/FormInputField";
import { Box } from "@mui/material";
import { FormikProps } from "formik";

interface ChangePasswordFormValues {
  newPassword: string;
  newPassword_confirmation: string;
}

interface Props {
  formik: FormikProps<ChangePasswordFormValues>;
}

const ChangePasswordForm = ({ formik }: Props) => {
  const { values, handleChange } = formik;

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      <FormInputField
        name="newPassword"
        label="Neues Passwort"
        type="password"
        required
        value={values.newPassword}
        onChange={handleChange}
      />

      <FormInputField
        name="newPassword_confirmation"
        label="Passwort bestätigen"
        type="password"
        required
        value={values.newPassword_confirmation}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ChangePasswordForm;
