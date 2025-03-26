import axios from "axios";
import { getDefaultStore } from "jotai";
import {
  currentTokenAtom,
  userAtom,
  guestTokenAtom,
} from "../atoms/auth-atoms";
import { userManager } from "@/auth/config";
import { fetchGuestToken, logout } from "@/services/connect";

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const store = getDefaultStore();
  const token = store.get(currentTokenAtom);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor with all checks
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const store = getDefaultStore();

    // Check if it's a 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Check if we're already refreshing
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        let newToken: string | null = null;

        // Check if user is authenticated
        if (store.get(userAtom)) {
          // Handle user token refresh
          const user = await userManager.signinSilent();
          if (user && !user.expired) {
            store.set(userAtom, user);
            newToken = user.access_token;
          } else {
            throw new Error("Token refresh failed");
          }
        } else {
          // Handle guest token refresh
          newToken = await fetchGuestToken();
          if (!newToken) {
            throw new Error("Guest token refresh failed");
          }
        }

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Process queued requests
        refreshQueue.forEach((cb) => cb(newToken));
        refreshQueue = [];

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);

        // Clear state and handle logout
        store.set(userAtom, null);
        store.set(guestTokenAtom, null);

        if (store.get(userAtom)) {
          await logout();
          window.location.href = "/login";
        } else {
          window.location.href = "/error?code=token_refresh_failed";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      // Handle forbidden access
      window.location.href = "/error?code=access_denied";
    }

    return Promise.reject(error);
  },
);

export { api };
