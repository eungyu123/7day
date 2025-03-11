import "../../page/inventory/Inventory.css";
import "../../index.css";
import React from "react";

export default function InventoryItem({
  type,
  img,
  name,
  isSelected,
  onClick,
}) {
  const imgNameWithoutExt = img ? img.replace(/\.[^/.]+$/, "") : "";
  const imgPath = `${imgNameWithoutExt}Head.jpg`;
  const imagePath = `/images/${type}/${imgPath}`;
  return (
    <div
      className={`Inventory-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <img
        src={imagePath}
        className="inventory-img"
        alt={name}
        onError={(e) => (e.target.style.display = "none")} // 이미지가 없으면 숨김 처리
      />
    </div>
  );
}
