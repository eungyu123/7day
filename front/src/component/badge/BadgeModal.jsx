import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/badge/BadgeModal.css";
import "../../page/badge/DetailBadge.css";

export default function BadgeModal({ isOpen, setIsOpen, badge, name }) {
  return (
    //일반 모달 창
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="badge-modal-content">
        <div className="badge-modal-header">
          <Dialog.Close asChild>
            <button className="badge-close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="badge-modal-body">
          <img src={badge} className="badge-size" />
          <p className="badge-modal-message">{name}</p>
        </div>
      </Dialog.Content>
    </Dialog.Root>

    //detailbadge랑 같은 형태
    // <div className="badge-detail-background">
    //   <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
    //     <Dialog.Content className="badge-detail">
    //       <div className="badge-detail-content">
    //         <div className="badge-detail-image">
    //           <img src={badge} className="badge-size" />
    //         </div>
    //         <p>{name}</p>
    //       </div>
    //     </Dialog.Content>
    //   </Dialog.Root>
    // </div>
  );
}
