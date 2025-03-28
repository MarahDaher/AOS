import React, { createContext, useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { handleRequest } from "@api/handler/handleRequest";
import { UserProdileModel } from "@interfaces/User.model";
import { enqueueSnackbar } from "notistack";

interface AuthContextProps {
  user: UserProdileModel | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const cookies = new Cookies();

const STORAGE_KEY = "user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProdileModel | null>(() => {
    const storedUser = sessionStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true); // loading state for app bootstrap & login

  const login = async (email: string, password: string) => {
    setLoading(true);

    const loginRes = await handleRequest<{
      access_token: string;
      token_type: string;
      user: UserProdileModel;
    }>({
      method: "POST",
      endpoint: "/login",
      data: { email, password },
    });

    cookies.set("token", loginRes.access_token, { path: "/", sameSite: "lax" });

    const profileRes = await handleRequest<{
      user: UserProdileModel;
      permissions: { id: number; name: string }[];
    }>({
      method: "GET",
      endpoint: "/me",
    });

    const fullUser: UserProdileModel = {
      ...profileRes.user,
      permissions: profileRes.permissions.map((p) => p.name),
    };

    setUser(fullUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
    setLoading(false);
  };

  const logout = () => {
    cookies.remove("token", { path: "/" });
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // When app initializes, try to fetch user from /me if token exists
  useEffect(() => {
    const token = cookies.get("token");
    const hasUser = sessionStorage.getItem(STORAGE_KEY);

    if (token && !hasUser) {
      handleRequest<{
        user: UserProdileModel;
        permissions: { id: number; name: string }[];
      }>({
        method: "GET",
        endpoint: "/me",
        onUnauthorized: () => {
          logout();
          window.location.href = "/anmelden";
        },
      })
        .then((res) => {
          const user: UserProdileModel = {
            ...res.user,
            permissions: res.permissions.map((p) => p.name),
          };

          setUser(user);
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        })
        .catch(() => {
          logout();
          enqueueSnackbar("Sitzung abgelaufen. Bitte erneut anmelden.", {
            variant: "warning",
          });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
