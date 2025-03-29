// pages/Errors/NotFoundPage.tsx
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "@assets/404.svg";
import AOSLogo from "@assets/aos-logo.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
      bgcolor="#f7f9fc"
    >
      <img src={AOSLogo} alt="Logo" style={{ width: 100, marginBottom: 24 }} />

      <img src={NotFoundImage} alt="404" style={{ maxWidth: 400 }} />

      <Typography variant="h3" mt={4} color="primary">
        Seite nicht gefunden
      </Typography>
      <Typography variant="body1" mt={1} maxWidth={500}>
        Die Seite, die du suchst, existiert nicht oder wurde verschoben.
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        onClick={() => navigate("/")}
      >
        Zur Startseite
      </Button>
    </Box>
  );
};

export default NotFoundPage;
