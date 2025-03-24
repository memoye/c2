// atoms.ts
import { atom } from "jotai";
import type { User } from "oidc-client-ts";

export const userAtom = atom<User | null>(null);

export const accessTokenAtom = atom(
  (get) => get(userAtom)?.access_token || null,
);

export const isAuthenticatedAtom = atom(
  (get) => !!get(userAtom) && !get(userAtom)?.expired,
);
