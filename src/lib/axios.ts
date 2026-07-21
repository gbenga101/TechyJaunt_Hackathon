import axios from "axios";

import { API_TIMEOUT, AUTH_HEADER, AUTH_SCHEME } from "@/constants/api";
import { tokenStorage } from "./tokenStorage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attaches the access token to every request, when one exists.
// NOTE: baseURL already includes /api/v1 (see .env.example) — do NOT
// also prefix request paths with the API_VERSION constant, or URLs
// will double up (.../api/v1/api/v1/...).
api.interceptors.request.use((config) => {
  const tokens = tokenStorage.get();
  if (tokens?.accessToken) {
    config.headers[AUTH_HEADER] = `${AUTH_SCHEME} ${tokens.accessToken}`;
  }
  return config;
});

// Placeholder for 401 / refresh-token handling.
// Not implemented for MVP demo — full refresh-on-401 flow is a
// post-MVP item (see DECISIONS.md). For tonight, a 401 simply fails
// the request; user re-logs in.
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);