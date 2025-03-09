import "./MissionList.css";
// import { motion } from "framer-motion";
import { useState } from "react";

export default function MissionList({
  MissionContent,
  MissionReward,
  IsComplete,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const HandleRewardOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="missionlistcontainer">
        <p className="emojifont font-2xl">{IsComplete ? "✅" : "🎯"}</p>
        <p
          className={`${IsComplete ? "missioncomplete" : "missionincomplete"}`}
        >
          {MissionContent} {MissionReward}{" "}
        </p>
        {IsComplete && (
          <p className="emojifont gift-box" onClick={HandleRewardOpen}>
            🎁
          </p>
        )}
      </div>
      {isOpen && (
        <RouletteRewardModal
          isOpen={isOpen}
          setIsOpen={false}
          prize={MissionReward}
        />
      )}
    </>
  );
}
