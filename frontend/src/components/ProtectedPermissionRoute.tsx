// components/ProtectedPermissionRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthProvider";
import { Box, CircularProgress } from "@mui/material";
import { useAbility } from "@contexts/AbilityProvider";

interface Props {
  action: any;
  subject: string;
  children: React.ReactNode;
}

const ProtectedPermissionRoute = ({ action, subject, children }: Props) => {
  const { user, loading } = useAuth();
  const ability = useAbility();
  const location = useLocation();

  // Still checking auth
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

  // Not authenticated
  if (!user) {
    return <Navigate to="/anmelden" replace />;
  }

  // No permission
  if (!ability.can(action, subject)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Authorized
  return <>{children}</>;
};

export default ProtectedPermissionRoute;
