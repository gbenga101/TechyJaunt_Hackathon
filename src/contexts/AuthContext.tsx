import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AuthResponse } from "@/types";

interface AuthContextType {
  auth: AuthResponse | null;
  isAuthenticated: boolean;
  setAuth: (auth: AuthResponse) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuthState] = useState<AuthResponse | null>(null);

  const setAuth = (auth: AuthResponse) => {
    setAuthState(auth);
  };

  const clearAuth = () => {
    setAuthState(null);
  };

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: auth !== null,
      setAuth,
      clearAuth,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}