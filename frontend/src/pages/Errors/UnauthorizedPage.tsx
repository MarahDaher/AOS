// pages/UnauthorizedPage.tsx
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" color="error" gutterBottom>
        🚫 Zugriff verweigert
      </Typography>
      <Typography gutterBottom>
        Du hast keine Berechtigung, diese Seite zu sehen.
      </Typography>
      <Button onClick={goBack} variant="contained" sx={{ mt: 2 }}>
        Zurück
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
