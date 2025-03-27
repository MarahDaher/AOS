import BaseDialog from "@components/BaseDialog";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm";

export interface ChangePasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ChangePasswordFormValues) => void;
}

const initialValues: ChangePasswordFormValues = {
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Passwort muss mindestens 6 Zeichen lang sein")
    .required("Neues Passwort ist erforderlich"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwörter stimmen nicht überein")
    .required("Passwort bestätigen ist erforderlich"),
});

const ChangePasswordModal = ({ open, onClose, onSubmit }: Props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
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
