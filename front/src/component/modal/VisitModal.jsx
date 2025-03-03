import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import "../../page/modal/VisitModal.css";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useGetWeekWalkData } from "../../hook/useAPI";
import {
  getKaclFromSteps,
  getKmFromSteps,
  getMaxConsecutiveDays,
  getWeekDatesUntilToday,
} from "../../utils/utils";

export default function VisitModal({ isOpen, setIsOpen }) {
  const { data } = useGetWeekWalkData();
  const [goalSteps, setGoalSteps] = useState(10000);

  // 달력기준으로 한주의 데이터를 받기
  const weekRecordItems = [
    { day: "월", step: null },
    { day: "화", step: null },
    { day: "수", step: null },
    { day: "목", step: null },
    { day: "금", step: null },
    { day: "토", step: null },
    { day: "일", step: null },
  ];

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const WeekDatesUntileToday = getWeekDatesUntilToday();
  data.result.forEach((item, i) => {
    if (WeekDatesUntileToday.includes(item.date)) {
      const itemDay = new Date(item.date).getDay();
      const weekRecordItem = weekRecordItems.find(
        (item) => item.day == week[itemDay]
      );
      weekRecordItem.step = item.steps;
    }
  });
  const todayData = data.result.find(
    (v) => v.date == new Date().toISOString().split("T")[0]
  );

  const maxDay = getMaxConsecutiveDays(weekRecordItems);
  const distance = getKmFromSteps(todayData.steps);
  const calories = getKaclFromSteps(todayData.steps);
  const progress = Math.min(100, (todayData.steps / goalSteps) * 100);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="visit-modal-content">
        <VisuallyHidden>
          <Dialog.DialogTitle />
        </VisuallyHidden>
        <div className="visit-modal-header">
          <div className="visit-modal-title">연속 방문 {maxDay}일차</div>
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
              <span>{todayData.steps}</span> 걸음<span>&nbsp;/&nbsp;</span>{" "}
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
            <div>
              {todayData.date.split("-")[1]}월&nbsp;
              {todayData.date.split("-")[2]}일&nbsp;
              {week[new Date(todayData.date).getDay()]}요일
            </div>

            <div className="visit-modal-week-record-list">
              {weekRecordItems.map((item) => (
                <div className="visit-modal-week-record-item" key={item.day}>
                  <p>{item.day}</p>
                </div>
              ))}
            </div>
            <div className="visit-modal-week-record-steps">
              {weekRecordItems.map((item, i) => (
                <div className="visit-modal-week-record-step" key={i}>
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
