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
  const [selectedItem, setSelectedItem] = useState(null);
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
          {/* {console.log("characterItems: ",characterItems)} */}
          <div className="inventory-main">
            {selectedTab === "character"
              ? characterItems.map((item) => (
                  <InventoryItem
                    key={item._id}
                    img={item.characterLink}
                    name={item.characterName}
                    isSelected={appState.character === item.characterName}
                    onClick={() => {
                      setSelectedItem({type:"character", ...item});  
                      setIsModalOpen(true);
                    }}
                  />
                ))
              : petItems.map((item) => (
                  <InventoryItem
                    key={item.petName}
                    img={item.petLink}
                    name={item.petName}
                    isSelected={appState.pet === item.petName}
                    onClick={() => {
                      setSelectedItem({type:"pet", ...item});  
                      setIsModalOpen(true);
                    }}
                  />
                ))}
          </div>
        </div>

        <ConfirmCancelModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          confirmName={"구매"}
          selectedItem={selectedItem}
        />
      </div>
    </>
  );
}
