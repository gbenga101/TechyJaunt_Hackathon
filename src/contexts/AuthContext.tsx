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

/**
 * MVP fallback: backend does not yet return `profileComplete` on the
 * user object (confirmed with Backend team). We derive it client-side
 * from the fields that make up a "usable" account. Backend is also
 * adding `phone` to the auth response before tonight's presentation —
 * until then, `user.phone` may be undefined here, which is why it's
 * included in this check rather than assumed present.
 *
 * TODO (post-MVP): once backend ships a real `profileComplete` field,
 * delete this function and pass `authResponse.user.profileComplete`
 * straight through.
 */
function deriveProfileComplete(user: AuthResponse["user"]): boolean {
  return Boolean(user?.name && user?.phone && user?.role);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuthState] = useState<AuthResponse | null>(null);

  const setAuth = (authResponse: AuthResponse) => {
    setAuthState({
      ...authResponse,
      user: {
        ...authResponse.user,
        profileComplete: deriveProfileComplete(authResponse.user),
      },
    });
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