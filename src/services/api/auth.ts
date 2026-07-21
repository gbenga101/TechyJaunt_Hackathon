import { api } from "@/lib/axios";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  ResetPasswordPayload,
  ResetPasswordResponse,
  SignupPayload,
  VerifyForgotPasswordOtpPayload,
  VerifyForgotPasswordOtpResponse,
  VerifyRegisterOtpPayload,
} from "@/types/auth";

/**
 * All auth endpoints are relative to the axios baseURL, which already includes
 * /api/v1. Keep paths here as route fragments only.
 */
export async function signup(payload: SignupPayload): Promise<{ success: boolean }> {
  const { data } = await api.post<{ success: boolean }>("/auth/signup", payload);
  return data;
}

export async function verifyRegisterOtp(
  payload: VerifyRegisterOtpPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>(
    "/auth/verify-register-otp",
    payload
  );
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/refresh-token", {
    refreshToken,
  });
  return data;
}

export async function logout(refreshToken: string): Promise<void> {
  await api.post("/auth/logout", { refreshToken });
}

export async function logoutAll(): Promise<void> {
  await api.post("/auth/logout-all");
}

export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> {
  const { data } = await api.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    payload
  );
  return data;
}

export async function verifyForgotPasswordOtp(
  payload: VerifyForgotPasswordOtpPayload
): Promise<VerifyForgotPasswordOtpResponse> {
  const { data } = await api.post<VerifyForgotPasswordOtpResponse>(
    "/auth/verify-otp",
    payload
  );
  return data;
}

export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> {
  const { data } = await api.post<ResetPasswordResponse>(
    "/auth/reset-password",
    payload
  );
  return data;
}
