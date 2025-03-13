import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/RouletteRewardModal.css";
import { API_BASE_URL } from "../../constant/constant";

export default function RouletteRewardModal({ isOpen, setIsOpen, newReward }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="roulette-reward-modal-content">
        <div className="roulette-reward-modal-header">
          <Dialog.Close asChild>
            <button className="roulette-reward-close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="roulette-reward-modal-body">
          <img
            src={`${API_BASE_URL}/image/reward/${newReward.image}`}
            alt=""
            className="rm-reward-image"
          />
          <p className="roulette-reward-modal-message">축하합니다!</p>
          <p className="roulette-reward-modal-message">
            <b>
              {newReward.enterpriseName} {newReward.content}
            </b>
          </p>
          <p className="roulette-reward-modal-message">
            을(를) 획득하셨습니다!{" "}
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
