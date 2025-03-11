import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/badge/DetailBadge.css";

export default function BadgeModal({ isOpen, setIsOpen, badge, name }) {
  return (
    <div className="badge-detail-background">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className="badge-detail">
          <div className="badge-detail-content">
            <div className="badge-detail-image">
              <img src={badge} className="badge-size" />
            </div>
            <p>{name}</p>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
