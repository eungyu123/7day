import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "../../page/modal/UpModal.css";

export default function UpModal({ isOpen, setIsOpen, setDeliveryMessage }) {
  const handleOptionClick = (message) => {
    setDeliveryMessage(message);
    setIsOpen(false);
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Overlay className="up-modal-overlay" />
      <Dialog.Content className="up-modal-content">
        <div className="up-modal-header">배송시 요청사항을 선택해주세요</div>
        <div className="up-modal-body">
          <Dialog.Close asChild>
            <div
              className="up-modal-body-button"
              onClick={() => handleOptionClick("부재시 경비실에 맡겨주세요")}
            >
              부재시 경비실에 맡겨주세요
            </div>
          </Dialog.Close>
          <Dialog.Close asChild>
            <div
              className="up-modal-body-button"
              onClick={() => handleOptionClick("배송 전에 꼭 연락주세요")}
            >
              배송 전에 꼭 연락주세요
            </div>
          </Dialog.Close>
          <Dialog.Close asChild>
            <div
              className="up-modal-body-button"
              onClick={() => handleOptionClick("집 앞에 놔주세요")}
            >
              집 앞에 놔주세요
            </div>
          </Dialog.Close>
          <Dialog.Close asChild>
            <div
              className="up-modal-body-button"
              onClick={() => handleOptionClick("택배함에 놔주세요")}
            >
              택배함에 놔주세요
            </div>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
