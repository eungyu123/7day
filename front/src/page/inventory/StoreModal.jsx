import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import "../../page/inventory/Inventory.css";
export default function StoreModal({ isOpen, setIsOpen, img, type, itemName }) {
  const imgNameWithoutExt = img ? img.replace(/\.[^/.]+$/, "") : "";
  const imgPath = `${imgNameWithoutExt}Head.jpg`;
  const imagePath = `/images/${type}/${imgPath}`;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content" style={{ width: "200px" }}>
          <div className="modal-body">
            <div
              className="Inventory-item"
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <img src={imagePath} className="inventory-img" />
            </div>
            <div>
              <b>{itemName} </b> 구매완료 !!
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
