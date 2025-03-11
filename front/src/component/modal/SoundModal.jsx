import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";

export default function SoundModal({ isOpen, setIsOpen }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="modal-content">
        <div className="modal-header">
          <Dialog.Close asChild>
            <button className="close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="modal-body" style={{ marginTop: "25px" }}>
          <input type="range" className="sound-volume-bar" />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
