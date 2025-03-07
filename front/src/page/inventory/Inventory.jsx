import { useState } from "react";
import { useAppContext } from "../../context/context";
import "./Inventory.css";
import "../../index.css";
import Header from "../../component/common/header/Header";
import InventoryTabs from "../../component/inventory/InventoryTabs";
import InventoryItem from "../../component/inventory/InventoryItem";
import CharacterViewer from "../../component/inventory/CharacterViewer";
import RewardModal from "../../component/modal/RewardModal";

import { setCharacter, setPet } from "../../context/reducer/action/action";

export default function Inventory() {
  const { appState, dispatch } = useAppContext();
  console.log(appState, dispatch);

  const [selectedTab, setSelectedTab] = useState("character");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 캐릭터, 펫 임시 데이터
  const characterItems = [
    { type: "character", itemName: "character1" },
    { type: "character", itemName: "character2" },
    { type: "character", itemName: "character3" },
    { type: "character", itemName: "character4" },
    { type: "character", itemName: "character5" },
    { type: "character", itemName: "character6" },
    { type: "character", itemName: "character7" },
    { type: "character", itemName: "character8" },
    { type: "character", itemName: "character9" },
    { type: "character", itemName: "character10" },
  ];

  const petItems = [
    { id: 1, type: "pet", itemName: "pet1" },
    { id: 2, type: "pet", itemName: "pet2" },
    { id: 3, type: "pet", itemName: "pet3" },
    { id: 4, type: "pet", itemName: "pet4" },
    { id: 5, type: "pet", itemName: "pet5" },
    { id: 6, type: "pet", itemName: "pet6" },
    { id: 7, type: "pet", itemName: "pet7" },
    { id: 8, type: "pet", itemName: "pet8" },
    { id: 9, type: "pet", itemName: "pet9" },
  ];

  return (
    <>
      <Header PageName={"보관함"} />
      <div className="container">
        <CharacterViewer />
        <div className="inventory">
          <InventoryTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className="inventory-main">
            {selectedTab === "character"
              ? characterItems.map((item) => (
                  <InventoryItem
                    key={item.itemName}
                    isSelected={appState.character === item.itemName}
                    onClick={() => {
                      dispatch(setCharacter({ character: item.itemName }));
                    }}
                  />
                ))
              : petItems.map((item) => (
                  <InventoryItem
                    key={item.itemName}
                    isSelected={appState.pet === item.itemName}
                    onClick={() => {
                      dispatch(setPet({ pet: item.itemName }));
                    }}
                  />
                ))}
          </div>
        </div>

        {/* 임시 모달 확인 버튼 */}
        <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
        <RewardModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          goal={"3000보"}
        />
      </div>
    </>
  );
}
