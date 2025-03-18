import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import "../../page/inventory/Inventory.css";

import { buyCharacter, buyPet } from "../../api/storeApi";
import { useAppContext } from "../../context/context";
import { getUser } from "../../api/userApi";
import { setUser } from "../../context/reducer/action/action";
export default function ConfirmCancelModal({
  isOpen,
  setIsOpen,
  confirmName,
  selectedItem,
  img,
  type,
  itemName,
  price,
  setIsOpenPurchaseModal,
}) {
  const { appState, dispatch } = useAppContext();
  const imgNameWithoutExt = img ? img.replace(/\.[^/.]+$/, "") : "";
  const imgPath = `${imgNameWithoutExt}Head.jpg`;
  const imagePath = `/images/${type}/${imgPath}`;

  const handleBuy = async () => {
    if (!selectedItem) return;

    try {
      let response;
      if (selectedItem.type === "character") {
        response = await buyCharacter(selectedItem._id);
      } else if (selectedItem.type === "pet") {
        response = await buyPet(selectedItem._id);
      }

      if (response.type === "error") {
        alert("포인트가 부족합니다");
        setIsOpen(false);
        return;
      }

      setIsOpenPurchaseModal(true);
      setIsOpen(false);

      const user = await getUser();
      dispatch(setUser({ user: user.data }));
    } catch (error) {
      console.error("구매 실패: ", error);
    }
  };
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
              }}
            >
              <img src={imagePath} className="inventory-img" />
            </div>
            <div>{itemName}</div>
            <div style={{ marginBottom: "15px" }}>
              <span className="emojifont">💎</span>
              {price}
            </div>
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
