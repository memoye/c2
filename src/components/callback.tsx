import { authService } from "@/auth/config";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const CallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .handleCallback()
      .then(() => navigate("/"))
      .catch((err) => {
        console.error("Authentication error:", err);
        navigate("/login");
      });
  }, [navigate]);

  return <div>Loading authentication...</div>;
};
