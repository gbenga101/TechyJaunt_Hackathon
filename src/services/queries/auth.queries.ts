import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import * as authApi from "@/services/api/auth";
import { tokenStorage } from "@/lib/tokenStorage";
import { useAuth } from "@/contexts/AuthContext";
import type { AuthResponse } from "@/types";

// ============================================================================
// AUTHENTICATION HELPER
// ============================================================================
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

// ============================================================================
// ZOD VALIDATION SCHEMAS
// ============================================================================
export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const verifyForgotPasswordOtpSchema = z.object({
  token: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d+$/, "Code must be numeric"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ============================================================================
// REACT QUERY MUTATION HOOKS
// ============================================================================
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

export function useVerifyForgotPasswordOtp() {
  return useMutation({
    mutationFn: authApi.verifyForgotPasswordOtp,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
}