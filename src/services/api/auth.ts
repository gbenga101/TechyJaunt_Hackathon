import { api } from "@/lib/axios";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  VerifyRegisterOtpPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "@/types";

/**
 * All paths below are RELATIVE — axios baseURL already includes
 * /api/v1 (see src/lib/axios.ts). Endpoint names match the actual
 * backend build (Backend_Dev_Readme_doc.docx), NOT the older
 * Integration Guide draft (/register, /verify-otp for signup) —
 * those names are being corrected in the docs separately.
 *
 * NOTE: real auth responses are FLAT ({ success, accessToken,
 * refreshToken, user }) — not wrapped in the generic
 * ApiResponse<T>'s `data` field. Do not wrap AuthResponse in
 * ApiResponse<AuthResponse>; it will not match what the server sends.
 */

export async function signup(payload: SignupPayload): Promise<{ success: boolean }> {
  const { data } = await api.post("/auth/signup", payload);
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

/**
 * CONFIRMED with team: login is phone + password per original spec.
 * Backend's live /login currently accepts `email` instead — a
 * mistake against spec, backend is correcting it before presentation.
 * This function sends the CORRECT payload; it will fail against the
 * backend until that fix ships. Re-test right before the demo.
 */
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
  // Requires the Bearer token — attached automatically by the
  // axios request interceptor, no need to pass it here.
  await api.post("/auth/logout-all");
}

/**
 * UNCONFIRMED — Backend has not yet supplied example request bodies
 * for these three endpoints (unlike signup/login, which are fully
 * documented with examples). Payload shapes below are placeholders
 * matching ForgotPasswordPayload/ResetPasswordPayload in types/auth.ts,
 * which are themselves marked UNCONFIRMED. Do not treat this as a
 * verified contract — confirm with Backend before relying on it in
 * the live demo.
 */
export async function forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
  await api.post("/auth/forgot-password", payload);
}

export async function verifyResetOtp(payload: {
  phone: string;
  token: string;
}): Promise<{ resetToken: string }> {
  const { data } = await api.post("/auth/verify-otp", payload);
  return data;
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await api.post("/auth/reset-password", payload);
}