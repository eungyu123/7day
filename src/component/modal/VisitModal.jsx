import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import "../../page/modal/VisitModal.css";

export default function VisitModal({ isOpen, setIsOpen }) {
  const [currentSteps, setCurrentSteps] = useState(5020);
  const [goalSteps, setGoalSteps] = useState(10000);
  const [calories, setCalories] = useState(300);
  const [distance, setDistance] = useState(3.01);

  const progress = Math.min(100, (currentSteps / goalSteps) * 100);

  const weekRecordItems = [
    { day: "월", step: 3000 },
    { day: "화", step: currentSteps },
    { day: "수", step: null },
    { day: "목", step: null },
    { day: "금", step: 123 },
    { day: "토", step: null },
    { day: "일", step: 7896 },
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="visit-modal-content">
        <div className="visit-modal-header">
          <div className="visit-modal-title">연속 방문 3일차</div>
          <Dialog.Close asChild>
            <button className="modal-close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="visit-modal-body">
          <p className="visit-modal-small-text">
            조금만 더 걸어서 목표치를 채우세요!
          </p>
          <div className="visit-modal-pedometer">
            <p className="visit-modal-current-step">
              <span>{currentSteps}</span> 걸음<span>&nbsp;/&nbsp;</span>{" "}
              <span>{goalSteps}</span> 걸음
              <div className="visit-modal-step-info">
                {calories}kcal | {distance}km
              </div>
            </p>
            <div className="visit-modal-bar-chart">
              <div
                className="visit-modal-bar-chart-current"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="visit-modal-week-record">
            <div>2월 25일 화요일</div>

            <div className="visit-modal-week-record-list">
              {weekRecordItems.map((item) => (
                <div className="visit-modal-week-record-item" key={item.day}>
                  <p>{item.day}</p>
                </div>
              ))}
            </div>
            <div className="visit-modal-week-record-steps">
              {weekRecordItems.map((item) => (
                <div className="visit-modal-week-record-step" key={item.step}>
                  <p>{item.step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
