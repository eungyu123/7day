import "../../index.css";
import "../../page/badge/BadgePage.css";
import "../../page/badge/OverlappingBadges.css";

import React from "react";

export default function OverlappingBadges({ badges }) {
  const displayBadges = badges.slice(0, 4);

  return (
    <>
      <div className="badge-yourbadges">
        {displayBadges.map((badge, index) => (
          <div
            key={index}
            className="badge-overlap-item"
            style={{
              zIndex: displayBadges.length - index,
              marginLeft: index > 0 ? `${25 * index}px` : "0px",
            }}
          >
            <img src={badge} className="badge-overlap-item-img" />
          </div>
        ))}
      </div>
    </>
  );
}
