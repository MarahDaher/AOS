import { useRouteError } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
// import ErrorIllustration from "@assets/error.svg"; // 🎨 add your own SVG
import AOSLogo from "@assets/aos-logo.png";

const GenericErrorPage = () => {
  const error = useRouteError() as any;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={2}
      textAlign="center"
      bgcolor="#fff7f6"
    >
      <img src={AOSLogo} alt="Logo" style={{ width: 100, marginBottom: 24 }} />

      {/* <img
        src={ErrorIllustration}
        alt="Error"
        style={{ maxWidth: 400, marginBottom: 24 }}
      /> */}

      <Typography variant="h4" color="error">
        Unerwarteter Fehler
      </Typography>
      <Typography variant="body1" mt={1}>
        Es ist etwas schief gelaufen. Bitte versuche es später erneut.
      </Typography>

      {error?.message && (
        <Typography variant="body2" color="textSecondary" mt={2} maxWidth={500}>
          Fehler: {error.message}
        </Typography>
      )}

      <Button
        onClick={() => (window.location.href = "/")}
        variant="contained"
        sx={{ mt: 4 }}
      >
        Zur Startseite
      </Button>
    </Box>
  );
};

export default GenericErrorPage;
