import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormInputField from "@components/FormInputField";
import { FormikProps } from "formik";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface Props {
  formik: FormikProps<LoginFormValues>;
}

const LoginForm = ({ formik }: Props) => {
  const { values, handleChange } = formik;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      <FormInputField
        name="email"
        label="Email"
        type="email"
        required
        value={values.email}
        onChange={handleChange}
      />

      <FormInputField
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        required
        value={values.password}
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/* <FormControlLabel
        control={
          <Checkbox
            name="remember"
            checked={values.remember}
            onChange={handleChange}
          />
        }
        label="Remember me"
      /> */}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ py: 1.5, fontWeight: 600, textTransform: "none" }}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      {/* <Box textAlign="center" mt={1}>
        <Link href="#" underline="hover" fontSize={14}>
          Forgot your password?
        </Link>
      </Box> */}
    </Box>
  );
};

export default LoginForm;
