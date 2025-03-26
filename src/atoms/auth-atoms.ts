import { atom } from "jotai";
import type { User } from "oidc-client-ts";

// Base
export const guestTokenAtom = atom<string | null>(null);
export const userAtom = atom<
  (User | (User & { profile: { role: string } })) | null
>(null);

// Derived
export const currentTokenAtom = atom((get) => {
  const user = get(userAtom);
  const guestToken = get(guestTokenAtom);
  return user?.access_token || guestToken;
});

export const isAuthenticatedAtom = atom(
  (get) => !!get(userAtom) && !get(userAtom)?.expired,
);

export const authInitializedAtom = atom(false);
