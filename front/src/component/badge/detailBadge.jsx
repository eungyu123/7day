import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/badge/DetailBadge.css";

export default function RewardModal({ isOpen, setIsOpen, badge, name }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="badge-detail">
        <div>
          <img src={badge} className="badge-rotating-badge" />
          <p>{name}</p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
