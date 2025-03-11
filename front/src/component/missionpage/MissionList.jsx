import "./MissionList.css";
// import { motion } from "framer-motion";
import { useState } from "react";
// import RouletteRewardModal from "../modal/RouletteRewardModal";
import RouletteModal from "../modal/RouletteModal";

export default function MissionList({
  MissionContent,
  MissionReward,
  IsComplete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGiftBoxVisible, setGiftBoxVisible] = useState(true);

  const HandleRewardOpen = () => {
    setIsOpen(true);
    setGiftBoxVisible(false);
  };

  const HandleRewardClose = () => {
    setIsOpen(false); // 모달을 닫을 때
  };

  return (
    <>
      <div className="missionlistcontainer">
        <p className="emojifont font-2xl">{IsComplete ? "✅" : "🎯"}</p>
        <p
          className={`${IsComplete ? "missioncomplete" : "missionincomplete"}`}
        >
          {MissionContent}{" "}
        </p>
        {IsComplete && isGiftBoxVisible && (
          <p className="emojifont gift-box" onClick={HandleRewardOpen}>
            🎁
          </p>
        )}
      </div>
      {isOpen && (
        <RouletteModal isOpen={isOpen} setIsOpen={HandleRewardClose} />
      )}
    </>
  );
}
