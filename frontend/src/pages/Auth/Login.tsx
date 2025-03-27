import * as Yup from "yup";
import AOSLog from "../../assets/aos-logo.png";
import LoginForm from "./LoginForm";
import { Alert, Box, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  remember: false,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Ungültige E-Mail-Adresse")
    .required("E-Mail ist erforderlich"),
  password: Yup.string().required("Passwort ist erforderlich"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (values: LoginFormValues, { setSubmitting }: any) => {
    // Simulate login
    setErrorMessage("");

    setTimeout(() => {
      if (
        values.email === "admin@example.com" &&
        values.password === "123123"
      ) {
        navigate("/");
      } else {
        setErrorMessage("Ungültige E-Mail oder Passwort");
        setSubmitting(false);
      }
    }, 1000);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <img src={AOSLog} alt="Sitemark" width={100} />
        </Box>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Anmelden
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <LoginForm formik={formik} />
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default LoginPage;
