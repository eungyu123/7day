import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import RouletteRewardModal from "./RouletteRewardModal";
import { finishMission } from "../../api/missionApi";
import "../../page/modal/RouletteModal.css";

export default function RouletteModal({
  isOpen,
  setIsOpen,
  missionId,
  rewardId,
}) {
  const [spinning, setSpinning] = useState(false); // 회전 상태
  const [rotate, setRotate] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null); // 결과
  const [canSpin, setCanSpin] = useState(true); //돌렸는지 확인
  const [newReward, setNewReward] = useState(null);
  const [isOpenReward, setIsOpenReward] = useState(true);
  const prizes = [
    { prize: "🎁" },
    { prize: "🎁" },
    { prize: "🥚" },
    { prize: "💝" },
    { prize: "🐣" },
    { prize: "💝" },
    { prize: "🥚" },
    { prize: "💝" },
  ];
  console.log("rewardId", rewardId);
  const handleClick = async () => {
    if (!canSpin) return;
    setSpinning(true);
    setCanSpin(false);

    const data = await finishMission(missionId, rewardId._id);
    let itemIndex = prizes.findIndex((item) => item.prize == "🎁");

    const randomDegree = 3600 - itemIndex * 45; // 8개 보상이므로 45도
    setRotate(randomDegree);

    setTimeout(() => {
      setSpinning(false);
      setSelectedItem(itemIndex);
      setNewReward(rewardId);
    }, 4000);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="roulette-modal-content">
        <Dialog.Close asChild>
          <div className="roulette-m-container">
            <div
              className="roulette-m-left-section"
              onClick={() => setIsOpenAnimation(false)}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </div>
          </div>
        </Dialog.Close>
        <div className="roulette-animation-title-wrapper">
          <div className="">
            룰렛을 돌리세요&nbsp;<span className="emojifont">🍀</span>
          </div>
          <div className="">
            여러가지 쿠폰이 나와요&nbsp;<span className="emojifont">💰</span>
          </div>
        </div>

        <div className="roulette-modal-body">
          <div className="rouletteOuter">
            <div
              className={`roulette ${spinning ? "spinning" : ""}`}
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <div className="roulette-wheel">
                {prizes.map((item, index) => (
                  <div
                    key={index}
                    className="roulette-item emojifont"
                    style={{
                      transform: `rotate(${index * 45}deg)`,
                    }}
                  >
                    {item.prize}
                  </div>
                ))}
              </div>
              {/* 선 추가 */}
              {prizes.map((_, index) => (
                <div
                  key={index}
                  className="roulette-line"
                  style={{
                    transform: `rotate(${22.5 + index * 45}deg)`,
                  }}
                />
              ))}
            </div>
            <div className="roulettePin" />
          </div>
          <button
            className="rouletteBtn"
            onClick={handleClick}
            disabled={!canSpin}
          >
            룰렛 돌리기
          </button>

          {newReward && (
            <RouletteRewardModal
              isOpen={isOpenReward}
              setIsOpen={setIsOpenReward}
              newReward={newReward}
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
