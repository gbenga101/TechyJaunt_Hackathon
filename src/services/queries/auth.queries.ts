import { useMutation } from "@tanstack/react-query";

import * as authApi from "@/services/api/auth";
import { tokenStorage } from "@/lib/tokenStorage";
import { useAuth } from "@/contexts/AuthContext";
import type { AuthResponse } from "@/types";

function persistAuth(
  data: AuthResponse,
  setAuth: (auth: AuthResponse) => void
) {
  tokenStorage.set({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  setAuth(data);
}

export function useSignup() {
  return useMutation({
    mutationFn: authApi.signup,
  });
}

export function useVerifyRegisterOtp() {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: authApi.verifyRegisterOtp,
    onSuccess: (data) => persistAuth(data, setAuth),
  });
}

export function useLogin() {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => persistAuth(data, setAuth),
  });
}

export function useLogout() {
  const { clearAuth } = useAuth();
  return useMutation({
    mutationFn: () => {
      const tokens = tokenStorage.get();
      if (!tokens?.refreshToken) return Promise.resolve();
      return authApi.logout(tokens.refreshToken);
    },
    onSettled: () => {
      // Clear local auth state even if the server call fails —
      // don't strand the user logged-in-looking on a network error.
      tokenStorage.clear();
      clearAuth();
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
}