import "../../page/inventory/Inventory.css";
import "../../index.css";

const rootStyles = getComputedStyle(document.documentElement);
const tossBlue = rootStyles.getPropertyValue("--toss-blue").trim();

export default function InventoryTabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="inventoryHeader">
      <div
        className="inventorySelect"
        onClick={() => setSelectedTab("character")}
        style={{ color: selectedTab === "character" ? tossBlue : "#666666" }}
      >
        캐릭터
      </div>
      <div
        className="inventorySelect"
        onClick={() => setSelectedTab("pet")}
        style={{ color: selectedTab === "pet" ? tossBlue : "#666666" }}
      >
        펫
      </div>
    </div>
  );
}
