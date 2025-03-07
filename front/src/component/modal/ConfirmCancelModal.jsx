import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";

export default function ConfirmCancelModal({ isOpen, setIsOpen, confirmName }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content" style={{ width: "200px" }}>
          <div className="modal-body">
            <p className="modal-message">구매하시겠습니까?</p>
            <div className="modal-buttons">
              <Dialog.Close asChild>
                <button className="modal-small-button modal-cancel">
                  취소
                </button>
              </Dialog.Close>
              <button
                className="modal-small-button modal-confirm"
                onClick={() => console.log("구매 완료!")}
              >
                {confirmName}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
