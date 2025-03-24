import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const config = {
  authority: "/oidc-proxy",
  client_id: import.meta.env.CHRONICA_CLIENT_ID,
  redirect_uri: `${import.meta.env.CHRONICA_APP_URL}/auth/openiddict`,
  post_logout_redirect_uri: import.meta.env.CHRONICA_APP_URL,
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
  automaticSilentRenew: true,
  silent_redirect_uri: `${import.meta.env.CHRONICA_APP_URL}/silent-renew.html`,
  userStore: new WebStorageStateStore({ store: sessionStorage }),
};

export const userManager = new UserManager(config);

export const authService = {
  login: () => userManager.signinRedirect(),
  logout: () => userManager.signoutRedirect(),
  handleCallback: () => userManager.signinRedirectCallback(),
  getAccessToken: () =>
    userManager.getUser().then((user) => user?.access_token),
};
