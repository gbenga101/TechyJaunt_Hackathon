export type UserRole = "farmer" | "trader";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  profileComplete: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: AuthUser;
}

/**
 * Login payload — CONFIRMED with Backend team: login is phone + password.
 * (Backend's live /login currently accepts `email` — flagged as a mistake
 * against the original spec, backend is correcting it before presentation.)
 */
export interface LoginPayload {
  phone: string;
  password: string;
}

/**
 * Signup payload — aligned with the backend validation rules.
 * The backend expects the full name field as `fullName`.
 */
export interface SignupPayload {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: UserRole;
  location: {
    state: string;
    lga: string;
  };
  otpChannel: "email" | "voice";
}

/**
 * Matches backend's actual POST /verify-register-otp body.
 * Keyed by email (not phone) — this is how backend's OTP flow verifies signup.
 */
export interface VerifyRegisterOtpPayload {
  email: string;
  token: string;
}

/**
 * TODO — UNCONFIRMED: Backend Dev Readme documents /forgot-password,
 * /verify-otp (reset), and /reset-password exist but does not give
 * example request bodies for them, unlike /signup and /login which
 * have full examples. Do not build these forms against a guessed
 * shape — confirm the exact payload with Backend before wiring up
 * ForgotPasswordPage.
 */
// 1. POST /auth/forgot-password
export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// 2. POST /auth/verify-otp (Verify Forgot Password OTP)
export interface VerifyForgotPasswordOtpPayload {
  email: string;
  token: string; // The 6-digit OTP
}

export interface VerifyForgotPasswordOtpResponse {
  success: boolean;
  resetToken: string; // Pass this to step 3
}

// 3. POST /auth/reset-password
export interface ResetPasswordPayload {
  token: string; // resetToken from step 2
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}