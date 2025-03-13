import "../../page/inventory/Inventory.css";
import "../../index.css";
import ThreeScene from "../Three/ThreeScene";
import { useAppContext } from "../../context/context";

export default function CharacterViewer({
  selectedCharacter = "",
  selectedPet = "",
}) {
  const { appState, dispatch } = useAppContext();
  const character =
    selectedCharacter != "" ? selectedCharacter : appState.user.character;
  const pet = selectedPet != "" ? selectedPet : appState.user.pet;

  return (
    <div className="character-viewer">
      {/* 3D 이미지 넣을 공간 */}
      <ThreeScene character={character} pet={pet} />
    </div>
  );
}
