import "../../index.css";
import "../../page/badge/BadgePage.css";

import DetailBadge from "./detailBadge";

import React, { useState } from "react";

export default function myBadge({ image, name }) {
  const [isBadgeDetailOpen, setIsBadgeDetailOpen] = useState(false);

  return (
    <>
      <div className="badge-goal-item">
        <img
          className="badge-my-item"
          src={image}
          onClick={() => setIsBadgeDetailOpen(true)}
        ></img>
        <DetailBadge
          isOpen={isBadgeDetailOpen}
          setIsOpen={setIsBadgeDetailOpen}
          badge={image}
          name={name}
        />
      </div>
    </>
  );
}
