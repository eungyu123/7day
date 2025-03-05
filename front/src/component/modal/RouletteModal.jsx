import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import RouletteRewardModal from "./RouletteRewardModal";

import "../../page/modal/RouletteModal.css";

export default function RouletteModal({ isOpen, setIsOpen }) {
  const [spinning, setSpinning] = useState(false); // 회전 상태
  const [rotate, setRotate] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null); // 결과
  const [canSpin, setCanSpin] = useState(true); //돌렸는지 확인
  const prizes = [
    "보상1",
    "보상2",
    "보상3",
    "보상4",
    "보상5",
    "보상6",
    "보상7",
    "보상8",
  ];

  const handleClick = () => {
    if (!canSpin) return;
    setSpinning(true);
    setCanSpin(false);

    const itemIndex = Math.floor(Math.random() * prizes.length);
    const randomDegree = 3600 - itemIndex * 45; // 8개 보상이므로 45도
    setRotate(randomDegree);

    setTimeout(() => {
      setSpinning(false);
      setSelectedItem(itemIndex);
    }, 4000);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="roulette-modal-content">
        <div className="roulette-modal-header">
          <div className="roulette-modal-title">
            <p className="roulette-modal-title-text">일일 출석 보상</p>
          </div>
          <Dialog.Close asChild>
            <div className="roulette-modal-exit">
              <button className="modal-close-button">X</button>
            </div>
          </Dialog.Close>
        </div>
        <div className="roulette-modal-body">
          <div className="rouletteOuter">
            <div
              className={`roulette ${spinning ? "spinning" : ""}`}
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              {prizes.map((prize, i) => (
                <div
                  key={i}
                  className="roulette-item"
                  style={{ transform: `rotate(${i * 45}deg)` }}
                >
                  {prize}
                </div>
              ))}
              {/* 선 추가 */}
              {[...Array(6)].map((_, index) => (
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
          {selectedItem !== null && (
            <RouletteRewardModal
              isOpen={true}
              setIsOpen={() => setSelectedItem(null)}
              prize={prizes[selectedItem]}
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
