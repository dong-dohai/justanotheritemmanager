import { LocalizedDestinyCharacter } from "../../atoms/destiny";

export type CharacterAvatarProps = LocalizedDestinyCharacter;

export const CharacterAvatar = ({
  emblemBackgroundPath,
  emblemPath,
  classType,
  light,
}: CharacterAvatarProps) => {
  return (
    <div className="relative flex flex-row items-center px-2">
      <div
        className="absolute w-full h-full z-0 bg-cover bg-left-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://www.bungie.net${emblemBackgroundPath})`,
        }}
      />
      <div
        className="w-8 h-8"
        style={{
          backgroundImage: `url(https://www.bungie.net${emblemPath})`,
        }}
      />
      <div className="flex flex-col z-10">
        <div className="text-white text-sm font-bold">
          {classType === 0
            ? "Titan"
            : classType === 1
            ? "Hunter"
            : classType === 2
            ? "Warlock"
            : "Unknown"}
        </div>
        <div className="text-white text-xs">{light}</div>
      </div>
    </div>
  );
};

export default CharacterAvatar;