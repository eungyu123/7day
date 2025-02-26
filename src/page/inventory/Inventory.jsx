import { useState } from "react";
import "./Inventory.css";
import "../../index.css";
import InventoryTabs from "../../component/inventory/InventoryTabs";
import InventoryItem from "../../component/inventory/InventoryItem";
import CharacterViewer from "../../component/inventory/CharacterViewer";

export default function Inventory() {
  const [selectedTab, setSelectedTab] = useState("character");
  const [selectedId, setSelectedId] = useState(null);

  // 캐릭터, 펫 임시 데이터
  const inventoryItems = [
    { id: 1, type: "character" },
    { id: 2, type: "character" },
    { id: 3, type: "character" },
    { id: 4, type: "character" },
    { id: 5, type: "character" },
    { id: 6, type: "character" },
    { id: 7, type: "character" },
    { id: 8, type: "character" },
    { id: 9, type: "character" },
    { id: 10, type: "character" },
    { id: 11, type: "pet" },
    { id: 12, type: "pet" },
    { id: 13, type: "pet" },
    { id: 14, type: "pet" },
    { id: 15, type: "pet" },
    { id: 16, type: "pet" },
    { id: 17, type: "pet" },
    { id: 18, type: "pet" },
    { id: 19, type: "pet" },
  ];

  return (
    <div className="container">
      <CharacterViewer />
      <div className="inventory">
        <InventoryTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="inventoryMain">
          {inventoryItems
            .filter((item) => item.type === selectedTab)
            .map((item) => (
              <InventoryItem
                key={item.id}
                isSelected={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
