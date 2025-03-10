import "../../page/inventory/Inventory.css";
import "../../index.css";
import React, { useState, useEffect } from "react";
import { generateThumbnail } from "../../utils/generateThumbnail"; // 함수 임포트

export default function InventoryItem({ character, pet, isSelected, onClick }) {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    // 썸네일 이미지 생성
    const thumbnailURL = generateThumbnail(character, pet);
    console.log("썸네일: ", thumbnailURL);
    setThumbnail(thumbnailURL);
  }, [character, pet]);

  return (
    <div
      className={`Inventory-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {thumbnail ? (
        <img src={thumbnail} className="inventory-img" />
      ) : (
        <p>Loading thumbnail...</p>
      )}
    </div>
  );
}
