import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";

import {buyCharacter, buyPet} from "../../api/storeApi";

export default function ConfirmCancelModal({ isOpen, setIsOpen, confirmName, selectedItem }) {
  
  const handleBuy = async() => {
    console.log("구매할 아이템은 ", selectedItem);
    if(!selectedItem) return;

    try {
      let response;
      if(selectedItem.type === "character") {
        response = await buyCharacter(selectedItem._id);
      } else if(selectedItem.type === "pet") {
        response = await buyPet(selectedItem._id);
      }

      if(response.type === "error") {
        alert("포인트가 부족합니다");
        setIsOpen(false);
        return;
      }

      alert(`${selectedItem.characterName} 구매 완료!`);
      setIsOpen(false);
    } catch(error) {
      console.error("구매 실패: ", error);
    }
  }
  
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
                onClick={handleBuy}
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
