import "../../page/inventory/Inventory.css";
import "../../index.css";

const rootStyles = getComputedStyle(document.documentElement);
const tossBlue = rootStyles.getPropertyValue("--toss-blue").trim();

export default function InventoryTabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="inventory-header">
      <div
        className="inventory-select"
        onClick={() => setSelectedTab("character")}
        style={{ color: selectedTab === "character" ? tossBlue : "#666666" }}
      >
        캐릭터
      </div>
      <div
        className="inventory-select"
        onClick={() => setSelectedTab("pet")}
        style={{ color: selectedTab === "pet" ? tossBlue : "#666666" }}
      >
        펫
      </div>
    </div>
  );
}
