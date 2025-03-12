import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import "../../page/modal/GifticonModal.css";

export default function GifticonModal({
  isOpen,
  setIsOpen,
  imgSrc,
  description,
  barcodeNumber,
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="modal-content">
        <div className="modal-header">
          <Dialog.Close asChild>
            <button className="close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="modal-body" style={{ marginTop: "25px" }}>
          <div className="gifticon-modal-period">
            6월 11일 23시 까지 사용 가능
          </div>
          <div>
            <img src={imgSrc} className="gifticon-modal-img" />
          </div>
          <div className="gifticon-modal-description">{description}</div>
          <div className="gifticon-modal-barcode-container">
            <div className="gifticon-modal-fake-barcode">
              {barcodeNumber.split("").map((digit, index) => (
                <div
                  key={index}
                  className={`gifticon-modal-barcode-bar bar-${digit}`}
                />
              ))}
              {barcodeNumber.split("").map((digit, index) => (
                <div
                  key={index}
                  className={`gifticon-modal-barcode-bar bar-${digit}`}
                />
              ))}
            </div>
            <div className="gifticon-modal-barcode-number">{barcodeNumber}</div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
