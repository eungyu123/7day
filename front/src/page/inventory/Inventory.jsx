import { useState, useEffect } from "react";
import { useAppContext } from "../../context/context";
import "./Inventory.css";
import "../../index.css";
import Header from "../../component/common/header/Header";
import InventoryTabs from "../../component/inventory/InventoryTabs";
import InventoryItem from "../../component/inventory/InventoryItem";
import CharacterViewer from "../../component/inventory/CharacterViewer";
import RewardModal from "../../component/modal/RewardModal";

import { setCharacter, setPet } from "../../context/reducer/action/action";
import { updateInventoryData } from "../../api/inventoryApi";

export default function Inventory() {
  const { appState, dispatch } = useAppContext();
  console.log(appState, dispatch);

  const [selectedTab, setSelectedTab] = useState("character");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterItems, setCharacterItems] = useState([]);
  const [petItems, setPetItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await updateInventoryData({
          newCharacter: null,
          newPet: null,
        });

        if (response.type === "success") {
          setCharacterItems(response.data.characterList || []);
          setPetItems(response.data.petList || []);
        }
      } catch (error) {
        console.error("인벤토리 불러오기 실패: ", error);
      }
    };

    fetchInventory();
  }, []);

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
          {console.log("유저의 캐릭터 리스트: ", characterItems)}
          <div className="inventory-main">
            {selectedTab === "character"
              ? characterItems.map((item) => (
                  <InventoryItem
                    key={item._id}
                    img={item.characterLink}
                    name={item.characterName}
                    isSelected={appState.character === item.characterName}
                    onClick={() => {
                      dispatch(setCharacter({ character: item.characterName }));
                    }}
                  />
                ))
              : petItems.map((item) => (
                  <InventoryItem
                    key={item._id}
                    img={item.petLink}
                    name={item.petName}
                    isSelected={appState.pet === item.petName}
                    onClick={() => {
                      dispatch(setPet({ pet: item.petName }));
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
