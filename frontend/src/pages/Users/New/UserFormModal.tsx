import BaseDialog from "@components/BaseDialog";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import UserForm from "./UserForm";
import { Roles } from "@enums/Roles.enum";
import { Box, Button } from "@mui/material";
import { FormMode } from "@enums/FormMode";

export interface UserFormValues {
  username: string;
  password?: string;
  email: string;
  role: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
  initialValues?: UserFormValues;
  mode?: FormMode;
}

const UserFormModal = ({
  open,
  onClose,
  onSubmit,
  initialValues = {
    username: "",
    email: "",
    password: "",
    role: Roles.ADMIN,
  },
  mode = FormMode.CREATE,
}: Props) => {
  const getValidationSchema = (mode: FormMode) =>
    Yup.object({
      username: Yup.string().required("Benutzername ist erforderlich"),
      email: Yup.string()
        .email("Ungültige E-Mail")
        .required("E-Mail ist erforderlich"),
      role: Yup.string().required("Rolle ist erforderlich"),
      ...(mode === FormMode.CREATE && {
        password: Yup.string()
          .min(6, "Passwort muss mindestens 6 Zeichen lang sein")
          .required("Passwort ist erforderlich"),
      }),
    });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={getValidationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
        onClose();
      }}
    >
      {(formik) => (
        <Form>
          <BaseDialog
            title={
              mode === FormMode.EDIT
                ? "Benutzer bearbeiten"
                : "Neuen Benutzer hinzufügen"
            }
            open={open}
            onClose={onClose}
            hideActions={true}
            onSubmit={formik.submitForm}
          >
            <UserForm formik={formik} mode={mode} />
            <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={onClose}>Abbrechen</Button>
              <Button
                type="submit"
                onClick={formik.submitForm}
                variant="contained"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Speichern
              </Button>
            </Box>
          </BaseDialog>
        </Form>
      )}
    </Formik>
  );
};

export default UserFormModal;
