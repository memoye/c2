import { userAtom } from "@/atoms/auth-atoms";
import { authService } from "@/auth/config";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";

let firstRender = true; //import.meta.env.DEV;

export function LoginCallback() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    firstRender = false;

    const handleAuth = async () => {
      try {
        const user = await authService.handleCallback();

        setUser(user || null);

        const redirectPath =
          sessionStorage.getItem("preAuthRoute") || "/dashboard";
        sessionStorage.removeItem("preAuthRoute");
        navigate(redirectPath, { replace: true });
      } catch (err) {
        console.error("Login Error: ", err);
        navigate("/login", { replace: true });
      }
    };

    if (!firstRender) handleAuth();
  }, [navigate, setUser]);

  return <div>Loading authentication...</div>;
}
