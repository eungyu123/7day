import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import * as Dialog from "@radix-ui/react-dialog";

import "../../page/modal/Modal.css";

import { setPoints } from "../../api/userApi";
// import { useAppContext } from "../../context/context";

export default function PedometerClearModal({ isOpen, setIsOpen }) {
  const { appState, dispatch } = useAppContext();
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const randomNum = Math.floor(Math.random() * 10);
  const point = points[randomNum];

  useEffect(() => {
    const handlePoint = async () => {
      try {
        if (!appState.user.PedometerClearModal) {
          const response = await setPoints(point);
        }
      } catch (error) {
        console.error("포인트 셋팅 실패:", error);
      }
    };
    handlePoint();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="modal-content">
        <div className="modal-header">
          <Dialog.Close asChild>
            <button className="close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="modal-body">
          <div className="modal-message">만보를 달성하셨습니다</div>
          <br />
          <img
            src="https://em-content.zobj.net/source/microsoft-teams/363/wrapped-gift_1f381.png"
            loading="lazy"
            alt="15.0"
            style={{ width: "60px", height: "60px", marginBottom: "20px" }}
          />
          <p>
            <b>{point}포인트</b> 획득!
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
