// context/PermissionProvider.tsx
import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";

interface PermissionContextProps {
  hasRole: (roles: string | string[]) => boolean;
}

const PermissionContext = createContext<PermissionContextProps | undefined>(
  undefined
);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const hasRole = (roles: string | string[]) => {
    if (!user) return false;
    if (Array.isArray(roles)) return roles.includes(user.role);
    return user.role === roles;
  };

  return (
    <PermissionContext.Provider value={{ hasRole }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const ctx = useContext(PermissionContext);
  if (!ctx)
    throw new Error("usePermission must be used inside PermissionProvider");
  return ctx;
};
