import { useState, useEffect } from "react";
import { useAppContext } from "../../context/context";
import "./Inventory.css";
import "../../index.css";
import InventoryTabs from "../../component/inventory/InventoryTabs";
import InventoryItem from "../../component/inventory/InventoryItem";
import CharacterViewer from "../../component/inventory/CharacterViewer";
import ConfirmCancelModal from "../../component/modal/ConfirmCancelModal";

// import { setCharacter, setPet } from "../../context/reducer/action/action";
import Header from "../../component/common/header/Header";
import {getStore} from "../../api/storeApi";

export default function Store() {
  const { appState, dispatch } = useAppContext();
  // console.log(appState, dispatch);

  const [selectedTab, setSelectedTab] = useState("character");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterItems, setCharacterItems] = useState([]);
  const [petItems, setPetItems] = useState([]);

  useEffect(()=> {
    const fetchStoreData = async () => {
      try {
        const data = await getStore();
        setCharacterItems(data.characters || []);
        setPetItems(data.pets || []);
      } catch(error) {
        console.error("상점 데이터 불러오기 실패: ", error);
      }
    } 
    fetchStoreData();
  }, []);


  // // 캐릭터, 펫 임시 데이터
  // const characterItems = [
  //   { type: "character", itemName: "character1" },
  //   { type: "character", itemName: "character2" },
  //   { type: "character", itemName: "character3" },
  //   { type: "character", itemName: "character4" },
  //   { type: "character", itemName: "character5" },
  //   { type: "character", itemName: "character6" },
  //   { type: "character", itemName: "character7" },
  //   { type: "character", itemName: "character8" },
  //   { type: "character", itemName: "character9" },
  //   { type: "character", itemName: "character10" },
  // ];

  // const petItems = [
  //   { id: 1, type: "pet", itemName: "pet1" },
  //   { id: 2, type: "pet", itemName: "pet2" },
  //   { id: 3, type: "pet", itemName: "pet3" },
  //   { id: 4, type: "pet", itemName: "pet4" },
  //   { id: 5, type: "pet", itemName: "pet5" },
  //   { id: 6, type: "pet", itemName: "pet6" },
  //   { id: 7, type: "pet", itemName: "pet7" },
  //   { id: 8, type: "pet", itemName: "pet8" },
  //   { id: 9, type: "pet", itemName: "pet9" },
  // ];

  return (
    <>
      <Header PageName={"상점"} />
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
                    key={item.characterName}
                    img={item.characterLink}
                    name={item.characterName}
                    isSelected={appState.character === item.characterName}
                    onClick={() => setIsModalOpen(true)}
                  />
                ))
              : petItems.map((item) => (
                  <InventoryItem
                    key={item.petName}
                    img={item.petLink}
                    name={item.petName}
                    isSelected={appState.pet === item.petName}
                    onClick={() => setIsModalOpen(true)}
                  />
                ))}
          </div>
        </div>

        <ConfirmCancelModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          confirmName={"구매"}
        />
      </div>
    </>
  );
}
