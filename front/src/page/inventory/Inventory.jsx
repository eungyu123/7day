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

  // useEffect(() => {
  //   const fetchInventory = async () => {
  //     try {
  //       const response = await updateInventoryData({
  //         newCharacter: null,
  //         newPet: null,
  //       });

  //       if (response.type === "success") {
  //         setCharacterItems(response.data.characterList || []);
  //         setPetItems(response.data.petList || []);
  //       }
  //     } catch (error) {
  //       console.error("인벤토리 불러오기 실패: ", error);
  //     }
  //   };

  //   fetchInventory();
  // }, []);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const data = await getInventoryData(); // API 호출
        // setCharacterItems(data.characterItems); // 데이터를 state에 저장
        // setPetItems(data.petItems); // 로딩 종료
        const minItemsCount = 8;
        console.log("data: ", data.data);

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
                characterLink: "/sampleCharacter",
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
                petLink: "/samplePet",
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
      <Header PageName={"보관함"} />
      <div className="container">
        <CharacterViewer />
        <div className="inventory">
          <InventoryTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {console.log("유저의 캐릭터 리스트: ", characterItems)}
          {console.log("유저의 펫 리스트: ", petItems)}
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
