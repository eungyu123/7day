import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/CheckModal.css";

export default function CheckModal({ isOpen, setIsOpen }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="check-modal-content">
        <div className="check-modal-modal-header">
          <Dialog.Close asChild>
            <button className="check-modal-close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="check-modal-modal-body">
          <label className="check-modal-check">
            <input type="checkbox"></input>
            <span className="check-modal-icon"></span>
          </label>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
