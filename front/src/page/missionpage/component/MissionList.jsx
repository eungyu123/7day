import "./MissionList.css";
// import { motion } from "framer-motion";
import { useState } from "react";
// import RouletteRewardModal from "../modal/RouletteRewardModal";
import RouletteModal from "../../../component/modal/RouletteModal";
import { PAGE_URLS } from "../../../constant/constant";
import MissionFinishModal from "./MissionFinishModal";

export default function MissionList({
  MissionContent,
  IsComplete,
  getReward,
  missionId,
  rewardId,
}) {
  const [isOpenRoulette, setIsOpenRoulette] = useState(false);
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const HandleRewardOpen = () => {
    setIsOpenAnimation(true);
  };
  console.log("ids", missionId, rewardId);
  return (
    <>
      {!getReward && (
        <div className="mission-list-container">
          <p className="emojifont font-2xl">{IsComplete ? "✅" : "🎯"}</p>
          <p
            className={`${
              IsComplete ? "mission-complete" : "mission-incomplete"
            }`}
          >
            {MissionContent}
          </p>
          {IsComplete && (
            <p className="emojifont gift-box" onClick={HandleRewardOpen}>
              🎁
            </p>
          )}
        </div>
      )}

      {isOpenRoulette && (
        <RouletteModal
          isOpen={isOpenRoulette}
          setIsOpen={setIsOpenRoulette}
          missionId={missionId}
          rewardId={rewardId}
        />
      )}

      {isOpenAnimation && (
        <MissionFinishModal
          setIsOpenAnimation={setIsOpenAnimation}
          setIsOpenRoulette={setIsOpenRoulette}
        />
      )}
    </>
  );
}
