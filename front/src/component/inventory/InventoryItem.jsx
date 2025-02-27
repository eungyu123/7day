import "../../page/inventory/Inventory.css";
import "../../index.css";

export default function InventoryItem({ isSelected, onClick }) {
  return (
    <div
      className={`Inventory-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    ></div>
  );
}
