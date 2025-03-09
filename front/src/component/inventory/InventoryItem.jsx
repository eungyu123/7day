import "../../page/inventory/Inventory.css";
import "../../index.css";

export default function InventoryItem({ img, name, isSelected, onClick }) {
  return (
    <div
      className={`Inventory-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <img src={img} alt={name} className="inventory-img" />
    </div>
  );
}
