// import axios from "axios";
// import { getAccessToken, logout } from "../services/connect";
// import { userManager } from "../auth/config";

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// api.interceptors.request.use(async (config) => {
//   const token = await getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

// if (error.response?.status === 401 && !originalRequest._retry) {
//   originalRequest._retry = true;
//   try {
//     await userManager.signinSilent();
//     return api(originalRequest);
//   } catch (silentError) {
//     console.log("Silent renew error", silentError);
//     await logout();
//     window.location.href = "/login";
//   }
// }

//     return Promise.reject(error);
//   },
// );

// src/lib/api-client.ts
import axios from "axios";
import { getDefaultStore } from "jotai";
import { currentTokenAtom, userAtom } from "../atoms/auth-atoms";
import { userManager } from "@/auth/config";
import { logout } from "@/services/connect";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor
apiClient.interceptors.request.use(async (config) => {
  const store = getDefaultStore();
  const token = store.get(currentTokenAtom);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const store = getDefaultStore();

      try {
        if (store.get(userAtom)) {
          // Silent renew for authenticated users
          const user = await userManager.signinSilent();
          store.set(userAtom, user); // Update Jotai state
        } else {
          // Refresh guest token
          const newToken = await fetchGuestToken();
          store.set(guestTokenAtom, newToken); // Update Jotai state
        }

        return apiClient(originalRequest); // Use correct instance
      } catch (error) {
        if (store.get(userAtom)) {
          // User session expired
          await logout();
          window.location.href = "/login";
        } else {
          // Guest token failure
          store.set(guestTokenAtom, null);
          window.location.href = "/error"; // Specific error page
        }

        // console.error("Refresh failed:", error);
        if (store.get(userAtom)) {
          await logout();
          window.location.href = "/login";
        }
        // Handle guest token failure differently
        throw error;
      }
    }

    return Promise.reject(error);
  },
);
