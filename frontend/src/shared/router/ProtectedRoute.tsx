// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthProvider";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/anmelden" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
