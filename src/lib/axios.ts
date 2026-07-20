import axios from "axios";

import { API_TIMEOUT } from "@/constants/api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});