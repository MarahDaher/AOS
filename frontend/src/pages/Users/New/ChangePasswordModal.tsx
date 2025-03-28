import BaseDialog from "@components/BaseDialog";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm";

export interface ChangePasswordFormValues {
  newPassword: string;
  newPassword_confirmation: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ChangePasswordFormValues) => void;
}

const initialValues: ChangePasswordFormValues = {
  newPassword: "",
  newPassword_confirmation: "",
};

export const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Passwort muss mindestens 6 Zeichen lang sein")
    .required("Passwort ist erforderlich"),
  newPassword_confirmation: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Die Passwörter stimmen nicht überein")
    .required("Passwortbestätigung ist erforderlich"),
});
const ChangePasswordModal = ({ open, onClose, onSubmit }: Props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
        onClose();
      }}
    >
      {(formik) => (
        <Form>
          <BaseDialog
            title="Passwort ändern"
            open={open}
            onClose={onClose}
            hideActions={true}
            onSubmit={formik.submitForm}
          >
            <ChangePasswordForm formik={formik} />

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

export default ChangePasswordModal;
