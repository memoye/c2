import { useEffect } from "react";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth-atoms";
import { userManager } from "@/auth/config";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    userManager.events.addUserLoaded(setUser);
    userManager.events.addUserUnloaded(() => setUser(null));

    return () => {
      userManager.events.removeUserLoaded(setUser);
      userManager.events.removeUserUnloaded(() => setUser(null));
    };
  }, [setUser]);

  return children;
};
