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
 * Signup payload — matches Backend Dev Readme's actual /signup example
 * exactly (this endpoint DOES use email, for OTP delivery — that's
 * separate from login, which uses phone).
 */
export interface SignupPayload {
  email: string;
  password: string;
  name: string;
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
export interface ForgotPasswordPayload {
  phone: string; // UNCONFIRMED — backend may expect email instead
}

export interface ResetPasswordPayload {
  resetToken: string; // UNCONFIRMED field name
  newPassword: string; // UNCONFIRMED field name
}