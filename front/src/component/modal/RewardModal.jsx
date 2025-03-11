import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import { Link } from "react-router-dom";
import { PAGE_URLS } from "../../constant/constant";

export default function RewardModal({ isOpen, setIsOpen, goal }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="modal-content">
        <div className="modal-header">
          <Dialog.Close asChild>
            <button className="close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="modal-body">
          <span className="modal-icon">🎁</span>
          <p className="modal-message">축하합니다!</p>
          <p className="modal-message">
            <strong>{goal}</strong> 미션 달성!
          </p>
          <Dialog.Close asChild>
            <Link to={PAGE_URLS.MissionPage} className="reward-button">
              보상받으러 가기
            </Link>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
