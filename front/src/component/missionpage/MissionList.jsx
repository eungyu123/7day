import "./MissionList.css";
// import { motion } from "framer-motion";
import { useState } from "react";
// import RouletteRewardModal from "../modal/RouletteRewardModal";
import RouletteModal from "../modal/RouletteModal";
import { PAGE_URLS } from "../../constant/constant";
import MissionFinishModal from "./MissionFinishModal";

export default function MissionList({
  MissionContent,
  IsComplete,
  getReward,
  missionId,
  rewardId,
}) {
  const [isGiftBoxVisible, setGiftBoxVisible] = useState(true);
  const [isRandomGift, setRandomGift] = useState("");
  const [isOpenRoulette, setIsOpenRoulette] = useState(false);
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const HandleRewardOpen = () => {
    setIsOpenAnimation(true);
    setGiftBoxVisible(false);
  };
  console.log("ids", missionId, rewardId);
  return (
    <>
      {!getReward && (
        <div className="missionlistcontainer">
          <p className="emojifont font-2xl">{IsComplete ? "✅" : "🎯"}</p>
          <p
            className={`${
              IsComplete ? "missioncomplete" : "missionincomplete"
            }`}
          >
            {MissionContent}
          </p>
          {IsComplete && isGiftBoxVisible && (
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
