import { useState, useEffect } from "react";
import { useAppContext } from "../../context/context";
import "./Inventory.css";
import "../../index.css";
import Header from "../../component/common/header/Header";
import InventoryTabs from "../../component/inventory/InventoryTabs";
import InventoryItem from "../../component/inventory/InventoryItem";
import CharacterViewer from "../../component/inventory/CharacterViewer";
import RewardModal from "../../component/modal/RewardModal";
import { getInventoryData } from "../../api/inventoryApi";

import { setCharacter, setPet } from "../../context/reducer/action/action";
import { updateInventoryData } from "../../api/inventoryApi";

export default function Inventory() {
  const { appState, dispatch } = useAppContext();
  console.log(appState, dispatch);

  const [selectedTab, setSelectedTab] = useState("character");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterItems, setCharacterItems] = useState([]);
  const [petItems, setPetItems] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const data = await getInventoryData(); // API 호출
        // setCharacterItems(data.characterItems); // 데이터를 state에 저장
        // setPetItems(data.petItems); // 로딩 종료
        const minItemsCount = 8;

        const characterItemsWithDefaults = [
          ...data.data.characterItems,
          ...Array.from(
            { length: minItemsCount - data.data.characterItems.length },
            (_, index) => {
              const newId = (
                data.data.characterItems.length +
                index +
                1
              ).toString(); // 1씩 증가하는 ID
              return {
                characterId: newId,
                characterName: `기본 캐릭터 ${newId}`, // ID를 이름에 포함
                price: 500,
                characterLink: `/sampleCharacter${newId}`,
              };
            }
          ),
        ];

        const petItemsWithDefaults = [
          ...data.data.petItems,
          ...Array.from(
            { length: minItemsCount - data.data.petItems.length },
            (_, index) => {
              const newId = (data.data.petItems.length + index + 1).toString(); // 1씩 증가하는 ID
              return {
                petId: newId,
                petName: `기본 펫 ${newId}`, // ID를 이름에 포함
                price: 500,
                petLink: `/samplePet${newId}`,
              };
            }
          ),
        ];

        console.log("Character Items:", characterItemsWithDefaults);
        console.log("Pet Items:", petItemsWithDefaults);
        setCharacterItems(characterItemsWithDefaults); // 데이터 state에 저장
        setPetItems(petItemsWithDefaults); // 데이터 state에 저장
      } catch (error) {
        console.log(error);
      }
    };

    fetchInventoryData(); // 함수 실행
  }, []);

  return (
    <>
      <div className="inventory-container">
        <Header PageName={"보관함"} />
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
                    key={item._id}
                    type="characters"
                    img={item.characterLink}
                    name={item.characterName}
                    isSelected={appState.user.character === item.characterLink}
                    onClick={() => {
                      dispatch(setCharacter({ character: item.characterLink }));
                    }}
                  />
                ))
              : petItems.map((item) => (
                  <InventoryItem
                    key={item._id}
                    type="pets"
                    img={item.petLink}
                    name={item.petName}
                    isSelected={appState.user.pet === item.petLink}
                    onClick={() => {
                      dispatch(setPet({ pet: item.petLink }));
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
