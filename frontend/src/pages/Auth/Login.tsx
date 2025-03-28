import * as Yup from "yup";
import AOSLog from "../../assets/aos-logo.png";
import LoginForm from "./LoginForm";
import { Box, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthProvider";

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
  const { login } = useAuth();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: any
  ) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      setSubmitting(false);
    }
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
