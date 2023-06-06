import axios from "axios";
import { atomWithDefault } from "jotai/utils";
import { bungieAccessTokenAtom } from "./auth";

export type GetMembershipForCurrentUserResponse = {
  Response: {
    destinyMemberships: {
      membershipId: string;
    }[];
  };
};

export const destinyMembershipIdAtom = atomWithDefault(async (get) => {
  const bungieAccessToken = get(bungieAccessTokenAtom);

  const response = await axios.get<GetMembershipForCurrentUserResponse>(
    "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
    {
      headers: {
        "X-API-Key": import.meta.env.VITE_BUNGIE_API_KEY || "",
        Authorization: `Bearer ${bungieAccessToken}`,
      },
    }
  );

  return response.data.Response.destinyMemberships[0].membershipId;
});

export type DestinyCharactersResponse = {
  Response: {
    characters: {
      data: {
        [characterId: string]: {
          characterId: string;
          classType: number;
          light: number;
          emblemBackgroundPath: string;
          emblemPath: string;
        };
      };
    };
  };
};

export type LocalizedDestinyCharacter = {
  characterId: string;
  classType: number;
  light: number;
  emblemBackgroundPath: string;
  emblemPath: string;
};

export const destinyCharactersAtom = atomWithDefault<
  LocalizedDestinyCharacter[]
>(async (get) => {
  const bungieAccessToken = get(bungieAccessTokenAtom);
  const destinyMembershipId = await get(destinyMembershipIdAtom);

  const response = await axios.get<DestinyCharactersResponse>(
    `https://www.bungie.net/Platform/Destiny2/3/Profile/${destinyMembershipId}/?components=Characters`,
    {
      headers: {
        "X-API-Key": import.meta.env.VITE_BUNGIE_API_KEY || "",
        Authorization: `Bearer ${bungieAccessToken}`,
      },
    }
  );

  const characters = response.data.Response.characters.data;

  return Object.keys(characters).map((characterId) => {
    const character = characters[characterId];

    return {
      characterId,
      classType: character.classType,
      light: character.light,
      emblemBackgroundPath: character.emblemBackgroundPath,
      emblemPath: character.emblemPath,
    };
  });
});
