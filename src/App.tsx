import { useEffect } from "react";
import { Outlet } from "react-router";
import { userManager } from "./auth/config";
import { initializeAuth } from "./services/connect";

export default function App() {
  useEffect(() => {
    const init = async () => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "oidc-silent-renew-failed") {
        userManager.signinSilent().catch(() => {
          sessionStorage.setItem("preAuthRoute", window.location.pathname);
          userManager.signinRedirect();
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return <Outlet />;
}
