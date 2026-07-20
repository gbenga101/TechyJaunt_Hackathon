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