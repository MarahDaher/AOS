import FormInputField from "@components/FormInputField";
import FormSelectField from "@components/FormSelectField";
import { Box } from "@mui/material";
import { Roles } from "@enums/Roles.enum";
import { FormikProps } from "formik";
import { UserFormValues } from "./UserFormModal";
import { FormMode } from "@enums/FormMode";

interface Props {
  formik: FormikProps<UserFormValues>;
  mode: FormMode;
}

const UserForm = ({ formik, mode }: Props) => {
  const { values, handleChange } = formik;

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      <FormInputField
        name="username"
        label="Benutzername"
        required
        value={values.username}
        onChange={handleChange}
      />
      <FormInputField
        name="email"
        label="E-Mail"
        type="email"
        required
        value={values.email}
        onChange={handleChange}
      />
      {mode === FormMode.CREATE && (
        <FormInputField
          name="password"
          label="Passwort"
          type="password"
          required
          value={values.password}
          onChange={handleChange}
        />
      )}

      <FormSelectField
        name="role"
        label="Rolle"
        required
        onChange={handleChange}
        options={[
          { label: "Administrator", value: Roles.ADMIN },
          { label: "Vertrieb", value: Roles.Sales },
          { label: "Produktion", value: Roles.PRODUCTION },
        ]}
      />
    </Box>
  );
};

export default UserForm;
