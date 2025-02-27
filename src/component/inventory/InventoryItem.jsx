import "../../page/inventory/Inventory.css";
import "../../index.css";

export default function InventoryItem({ isSelected, onClick }) {
  return (
    <div
      className={`InventoryItem ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    ></div>
  );
}
