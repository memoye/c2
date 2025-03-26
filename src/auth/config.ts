import {
  type UserManagerSettings,
  UserManager,
  WebStorageStateStore,
} from "oidc-client-ts";

const baseConfig: UserManagerSettings = {
  authority: `/vault`,
  client_id: import.meta.env.CHRONICA_AUTH_CLIENT_ID,
  redirect_uri: `${import.meta.env.CHRONICA_APP_URL}/auth/openiddict`,
  post_logout_redirect_uri: import.meta.env.CHRONICA_APP_URL,
  response_type: "code",
  scope: import.meta.env.CHRONICA_AUTH_SCOPE,
  loadUserInfo: true,
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: localStorage }),
  metadata: {
    issuer: `${window.location.origin}/vault`,
    authorization_endpoint: `${window.location.origin}/vault/connect/authorize`,
    token_endpoint: `${window.location.origin}/vault/connect/token`,
    userinfo_endpoint: `${window.location.origin}/vault/connect/userinfo`,
    end_session_endpoint: `${window.location.origin}/vault/connect/endsession`,
  },
};

const getSafeSearchParams = (config: UserManagerSettings) => {
  const params = new URLSearchParams();

  // Explicitly exclude userStore and other non-serializable values
  Object.entries(config).forEach(([key, value]) => {
    if (typeof value === "string" || typeof value === "number") {
      params.append(key, value.toString());
    }
  });

  return params;
};

export const userManager = new UserManager({
  ...baseConfig,
  silent_redirect_uri: `${import.meta.env.CHRONICA_APP_URL}/silent-renew.html?${getSafeSearchParams(baseConfig)}`,
});

export const authService = {
  login: () => userManager.signinRedirect(),
  logout: () => userManager.signoutRedirect(),
  handleCallback: async () =>
    userManager.signinCallback().catch((error) => {
      console.error("Authentication callback failed: ", error);
      throw error;
    }),
  getAccessToken: async () => {
    const user = await userManager.getUser();
    if (!user || user.expired) {
      throw new Error("No valid user session");
    }
    return user.access_token;
  },
};
