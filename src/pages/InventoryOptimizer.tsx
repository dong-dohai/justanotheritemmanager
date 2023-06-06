import { useAtom } from "jotai";
import { destinyCharactersAtom } from "../atoms/destiny";
import CharacterAvatar from "../components/CharacterAvatar/CharacterAvatar";

export const InventoryOptimizer = () => {
  const [destinyCharacters] = useAtom(destinyCharactersAtom);

  console.log(destinyCharacters);

  return (
    <div className="flex flex-row gap-2">
      {destinyCharacters.map((destinyCharacter) => {
        return (
          <CharacterAvatar
            key={destinyCharacter.characterId}
            {...destinyCharacter}
          />
        );
      })}
    </div>
  );
};
