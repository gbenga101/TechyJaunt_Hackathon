import type { AuthTokens } from "@/types";

const ACCESS_TOKEN_KEY = "farmroute_access_token";
const REFRESH_TOKEN_KEY = "farmroute_refresh_token";

/**
 * Plain (non-React) token storage so the axios interceptor — which
 * runs outside any component — can read the current token. AuthContext
 * stays the source of truth for UI state; this just mirrors the tokens
 * for axios and survives a page refresh during the demo.
 */
export const tokenStorage = {
  get(): AuthTokens | null {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!accessToken || !refreshToken) return null;
    return { accessToken, refreshToken };
  },
  set(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  },
  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};