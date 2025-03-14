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
  const [isMissionVisible, setMissionVisible] = useState(true);
  const [isRandomGift, setRandomGift] = useState("");

  const HandleRewardOpen = () => {
    RandomGift();
    setIsOpen(true);
    setGiftBoxVisible(false);
  };

  const HandleRewardClose = () => {
    setIsOpen(false); // 모달을 닫을 때
    setMissionVisible(false);
  };

  const RandomGift = () => {
    const randItem = Math.floor(Math.random() * 3) + 1;
    if (randItem === 1) {
      setRandomGift("알");
    } else if (randItem === 2) {
      setRandomGift("쿠폰");
    } else {
      setRandomGift("포인트");
    }
  };

  return (
    <>
      {isMissionVisible && (
        <div className="missionlistcontainer">
          <p className="emojifont font-2xl">{IsComplete ? "✅" : "🎯"}</p>
          <p
            className={`$ {IsComplete ? "missioncomplete" : "missionincomplete"}`}
          >
            {MissionContent}{" "}
          </p>
          {IsComplete && isGiftBoxVisible && (
            <p className="emojifont gift-box" onClick={HandleRewardOpen}>
              🎁
            </p>
          )}
        </div>
      )}
      {isOpen && (
        <RouletteModal
          isOpen={isOpen}
          setIsOpen={HandleRewardClose}
          gift={isRandomGift}
        />
      )}
    </>
  );
}
