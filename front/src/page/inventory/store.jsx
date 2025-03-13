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
import { getStore } from "../../api/storeApi";

export default function Store() {
  const { appState, dispatch } = useAppContext();
  // console.log(appState, dispatch);

  const [selectedTab, setSelectedTab] = useState("character");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterItems, setCharacterItems] = useState([]);
  const [petItems, setPetItems] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const data = await getStore();
        setCharacterItems(data.characters || []);
        console.log(characterItems);
        setPetItems(data.pets || []);
      } catch (error) {
        console.error("상점 데이터 불러오기 실패: ", error);
      }
    };
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
          {console.log("characterItems: ", characterItems)}
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
                      setSelectedItem({ type: "character", ...item });
                      setIsModalOpen(true);
                      setImgPath(item.characterLink);
                      setItemType("characters");
                      setItemName(item.characterName);
                      setItemPrice(item.price);
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
                      setSelectedItem({ type: "pet", ...item });
                      setIsModalOpen(true);
                      setImgPath(item.petLink);
                      setItemType("pets");
                      setItemName(item.petName);
                      setItemPrice(item.price);
                    }}
                  />
                ))}
          </div>
        </div>
        {console.log("selectedItem: ", selectedItem)};
        <ConfirmCancelModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          confirmName={"구매"}
          selectedItem={selectedItem}
          img={imgPath}
          type={itemType}
          itemName={itemName}
          price={itemPrice}
        />
      </div>
    </>
  );
}
