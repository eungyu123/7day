import { useState } from "react";
import "./Inventory.css";
import "../../index.css";

const rootStyles = getComputedStyle(document.documentElement);
const tossBlue = rootStyles.getPropertyValue("--toss-blue").trim();

export default function Inventory() {
  const [selectedTab, setSelectedTab] = useState("character");

  const tabStyles = {
    character: {
      color: selectedTab === "character" ? tossBlue : "#666666",
    },
    pet: {
      color: selectedTab === "pet" ? tossBlue : "#666666",
    },
  };

  return (
    <div className="container">
      <div className="characterViewer">{/* 3D 이미지 넣을 공간 */}</div>
      <div className="inventory">
        <div className="inventoryHeader">
          <div
            className="inventorySelect"
            onClick={() => setSelectedTab("character")}
            style={tabStyles.character}
          >
            캐릭터
          </div>
          <div
            className="inventorySelect"
            onClick={() => setSelectedTab("pet")}
            style={tabStyles.pet}
          >
            펫
          </div>
        </div>
        <div className="inventoryMain">
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
          <div className="InventoryItem"></div>
        </div>
      </div>
    </div>
  );
}
