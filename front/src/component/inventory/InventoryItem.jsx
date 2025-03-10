import "../../page/inventory/Inventory.css";
import "../../index.css";
import React, { useState, useEffect } from "react";
import { generateThumbnail } from "../../utils/generateThumbnail"; // 함수 임포트

export default function InventoryItem({ character, pet, isSelected, onClick }) {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const thumbnailURL = await generateThumbnail(character);
        console.log("썸네일:", thumbnailURL);
        setThumbnail(thumbnailURL);
      } catch (error) {
        console.error("썸네일 생성 오류:", error);
      }
    };

    fetchThumbnail();
  }, [character]);

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
