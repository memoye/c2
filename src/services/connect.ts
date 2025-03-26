import { getDefaultStore } from "jotai";
import { userManager } from "../auth/config";
import {
  authInitializedAtom,
  guestTokenAtom,
  userAtom,
} from "../atoms/auth-atoms";
import axios from "axios";

const store = getDefaultStore();

let isInitialized = false;

export async function initializeAuth() {
  if (isInitialized) return;
  isInitialized = true;

  const user = await userManager.getUser();

  if (user?.expired) {
    console.log("Token expired, attempting silent renew...");
    try {
      const freshUser = await userManager.signinSilent();
      store.set(userAtom, freshUser);
      return;
    } catch (error) {
      console.error("Silent renew failed:", error);
    }
  }

  store.set(userAtom, user);
  store.set(authInitializedAtom, true);

  if (!user) {
    await fetchGuestToken();
  }

  userManager.events.addUserLoaded((user) => {
    store.set(userAtom, user);
  });

  userManager.events.addUserSignedOut(() => {
    store.set(userAtom, null);
  });

  userManager.events.addAccessTokenExpiring(() => {
    userManager.signinSilent();
  });

  userManager.events.addSilentRenewError((error) => {
    console.error("Silent renew error:", error);
    logout();
  });

  // Session Monitoring
  setInterval(async () => {
    const user = await userManager.getUser();
    if (user?.expired) {
      userManager.signinSilent().catch(console.error);
    } else {
      console.log({ user });
      console.log("user is active");
    }
  }, 300000);
}

export async function login() {
  await userManager.signinRedirect();
}

export async function handleCallback() {
  const user = await userManager.signinRedirectCallback();
  store.set(userAtom, user);
  return user;
}

export async function logout() {
  await userManager.signoutRedirect();
}

export async function getAccessToken() {
  const user = await userManager.getUser();
  return user?.access_token;
}

export async function fetchGuestToken() {
  try {
    const response = await axios.post(
      `/vault/connect/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.CHRONICA_CLIENT_ID,
        client_secret: import.meta.env.CHRONICA_AUTH_CLIENT_SECRET,
      }).toString(),
    );

    const token = response.data.access_token;
    store.set(guestTokenAtom, token);
    return token;
  } catch (error) {
    // Handle error appropriately
    console.log("error", error);
  }
}
