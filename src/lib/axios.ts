import axios from "axios";

import { API_TIMEOUT, AUTH_HEADER, AUTH_SCHEME, API_VERSION } from "@/constants/api";
import { tokenStorage } from "./tokenStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://farmroutebackend.onrender.com";

export const api = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const tokens = tokenStorage.get();
  if (tokens?.accessToken) {
    config.headers[AUTH_HEADER] = `${AUTH_SCHEME} ${tokens.accessToken}`;
  }

  if (!config.url?.startsWith(API_VERSION)) {
    config.url = `${API_VERSION}${config.url ?? ""}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    const payload = response.data;

    if (payload && typeof payload === "object" && "success" in payload) {
      if (payload.success === false) {
        const error = new Error(payload.message || "Request failed") as Error & {
          status?: number;
        };
        error.status = payload.status ?? response.status;
        return Promise.reject(error);
      }

      // Backend wraps in { success, data } — unwrap to just data
      if ("data" in payload && payload.data !== undefined) {
        return { ...response, data: payload.data };
      }

      // Backend spreads at top level e.g. { success, accessToken, refreshToken, user }
      // Strip the success flag and return the rest
      const { success: _success, message: _message, ...rest } = payload as Record<string, unknown>;
      if (Object.keys(rest).length > 0) {
        return { ...response, data: rest };
      }
    }

    return response;
  },
  (error) => {
    const message = error?.response?.data?.message || error?.message || "Request failed";
    const normalizedError = new Error(message) as Error & {
      status?: number;
    };
    normalizedError.status = error?.response?.status;
    return Promise.reject(normalizedError);
  }
);