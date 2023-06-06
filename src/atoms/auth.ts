import axios from "axios";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";

export const authStateAtom = atomWithStorage(
  "auth-state",
  (localStorage.getItem("auth-state") || uuidv4()).replace(/"/g, "")
);

export const bungieAccessTokenAtom = atomWithStorage(
  "bungie-access-token",
  (localStorage.getItem("bungie-access-token") || "").replace(/"/g, "")
);

export const bungieRefreshTokenAtom = atomWithStorage(
  "bungie-refresh-token",
  (localStorage.getItem("bungie-refresh-token") || "").replace(/"/g, "")
);

export const bungieAccessTokenExpiresInAtom = atomWithStorage<number>(
  "bungie-access-token-expires-at",
  parseInt(localStorage.getItem("bungie-access-token-expires-at") || "0")
);

export const bungieRefreshTokenExpiresInAtom = atomWithStorage<number>(
  "bungie-refresh-token-expires-at",
  parseInt(localStorage.getItem("bungie-refresh-token-expires-at") || "0")
);

export const bungieMembershipIdAtom = atomWithStorage(
  "bungie-membership-id",
  localStorage.getItem("bungie-membership-id") || ""
);

export type FetchBungieAccessTokenInput = {
  code: string;
};

export type BungieAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  membership_id: string;
};

export const fetchBungieAccessTokenAtom = atom(
  null,
  async (_get, set, { code }: FetchBungieAccessTokenInput) => {
    console.log("fetching bungine access code");

    const response = await axios.post<BungieAccessTokenResponse>(
      "https://www.bungie.net/platform/app/oauth/token/",
      {
        code,
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_BUNGIE_CLIENT_ID,
        client_secret: import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);

    set(bungieAccessTokenAtom, response.data.access_token);
    set(bungieRefreshTokenAtom, response.data.refresh_token);
    set(bungieAccessTokenExpiresInAtom, response.data.expires_in);
    set(bungieRefreshTokenExpiresInAtom, response.data.refresh_expires_in);
    set(bungieMembershipIdAtom, response.data.membership_id);
  }
);
