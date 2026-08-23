import axios from "axios";
import { env } from "@/config/env";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./interceptors";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

setupRequestInterceptor(apiClient);
setupResponseInterceptor(apiClient);
