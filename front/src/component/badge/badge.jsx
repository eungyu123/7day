import "../../index.css";
import "../../page/badge/BadgePage.css";
import React from "react";
import { useState } from "react";
import BadgeModal from "./BadgeModal";

export default function badge({ name, progressStatus, image }) {
  const [isClaimed, setIsClaimed] = useState(false);
  const [isBadgeDetailOpen, setIsBadgeDetailOpen] = useState(false);

  const handleClaim = () => {
    setIsClaimed(true); // 뱃지 획득 상태 변경
    setIsBadgeDetailOpen(true); //뱃지 획득 모달
  };
  return (
    <>
      <div className="badge-goal-item">
        <img
          src={image}
          style={{ filter: isClaimed ? "grayscale(0%)" : "grayscale(100%)" }}
        ></img>
        <p className="badge-goal-name">{name}</p>
        <BadgeModal
          isOpen={isBadgeDetailOpen}
          setIsOpen={setIsBadgeDetailOpen}
          badge={image}
          name={`${name} 달성!`}
        />
        {progressStatus === 100 ? (
          <button
            className={`badge-button ${
              isClaimed ? "badge-no-button" : "badge-button"
            }`}
            onClick={handleClaim}
          >
            뱃지 획득
          </button>
        ) : (
          <div
            style={{
              backgroundColor: "#f0f0f0", // 전체 컨테이너 배경색
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <progress
              className="badge-goal-progressbar"
              value={progressStatus}
              max={100}
            />
          </div>
        )}
      </div>
    </>
  );
}
