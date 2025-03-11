import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/RouletteRewardModal.css";

export default function RouletteRewardModal({ isOpen, setIsOpen, gift }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="roulette-reward-modal-content">
        <div className="roulette-reward-modal-header">
          <Dialog.Close asChild>
            <button className="roulette-reward-close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="roulette-reward-modal-body">
          <span className="roulette-reward-modal-icon">🎉</span>
          <p className="roulette-reward-modal-message">축하합니다!</p>
          <p className="roulette-reward-modal-message">
            {gift}을(를) 획득하셨습니다!
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
