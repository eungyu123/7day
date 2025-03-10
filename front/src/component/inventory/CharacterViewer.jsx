import "../../page/inventory/Inventory.css";
import "../../index.css";
import ThreeScene from "../Three/ThreeScene";
import { useAppContext } from "../../context/context";

export default function CharacterViewer() {
  const { appState, dispatch } = useAppContext();

  return (
    <div className="character-viewer">
      {/* 3D 이미지 넣을 공간 */}
      <ThreeScene character={appState.user.character} pet={appState.user.pet} />
    </div>
  );
}
