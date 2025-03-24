import { getDefaultStore } from "jotai";
import { userManager } from "../auth/config";
import { userAtom } from "../atoms/auth-atoms";
import axios from "axios";

const store = getDefaultStore();

export async function initializeAuth() {
  const user = await userManager.getUser();
  store.set(userAtom, user);

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
      `${process.env.CHRONICA_AUTH_URL}/connect/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CHRONICA_CLIENT_ID!,
        client_secret: process.env.CHRONICA_CLIENT_SECRET!,
      }).toString(),
    );

    const token = response.data.access_token;
    store.set(guestTokenAtom, token);
    return token;
  } catch (error) {
    // Handle error appropriately
  }
}
