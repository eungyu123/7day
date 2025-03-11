import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import "../../page/modal/VisitModal.css";
import { getKaclFromSteps, getKmFromSteps } from "../../utils/utils";

import { getWalkData } from "../../api/walkApi";

export default function VisitModal({ isOpen, setIsOpen }) {
  const [currentSteps, setCurrentSteps] = useState(5020);
  const [visitCount, setVisitCount] = useState(1);
  const [todayIndex, setTodayIndex] = useState(0);
  const [goalSteps, setGoalSteps] = useState(10000);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [today, setToday] = useState(null);
  const [weekData, setWeekData] = useState([]);
  const [temp, setTemp] = useState(null);

  const progress = Math.min(100, (currentSteps / goalSteps) * 100);

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    const fetchWalkData = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dayOfWeek = today.getDay();

        //오늘 날짜 String 저장(ex- 3월 9일 일요일)
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const todayString = `${month}월 ${day}일 ${dayNames[dayOfWeek]}요일`;
        setToday(todayString);

        // 월요일
        const monday = new Date(today);
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        // 일요일
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로
          const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로
          return `${year}-${month}-${day}`;
        };

        const startDate = formatDate(monday);
        const endDate = formatDate(sunday);

        const response = await getWalkData(startDate, endDate);

        if (response.type === "success" && response.stepRecords) {
          const stepRecords = response.stepRecords || [];
          stepRecords.sort((a, b) => new Date(a.date) - new Date(b.date));

          // 오늘 걸음수 설정
          const todayString = new Date()
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/. /g, "-")
            .replace(".", "")
            .trim();

          const todayRecord = stepRecords.find((record) =>
            record.date.startsWith(todayString)
          );

          if (todayRecord) {
            setCurrentSteps(todayRecord.steps);
            setCalories(getKaclFromSteps(todayRecord.steps).toFixed(2));
            setDistance(getKmFromSteps(todayRecord.steps).toFixed(2));
          } else {
            setCurrentSteps(0);
          }

          // 일주일 날짜 범위 생성
          const getDateRange = (start, end) => {
            const dates = [];
            let currentDate = new Date(start);

            while (currentDate <= end) {
              dates.push(new Date(currentDate)); // 배열에 날짜 추가
              currentDate.setDate(currentDate.getDate() + 1); // 다음날로
            }
            return dates;
          };

          const start = new Date(startDate);
          const end = new Date(endDate);
          const allDates = getDateRange(start, end);

          // 날짜로 걸음수 매핑
          const stepsMap = new Map(
            stepRecords.map((record) => [
              record.date.split("T")[0],
              record.steps,
            ])
          );

          // 일주일 걸음 데이터
          const formattedData = allDates.map((date) => {
            const dateString = date.toISOString().split("T")[0];
            const steps = stepsMap.get(dateString) || 0; // 기록 없는 날은 0으로 설정
            const dayIndex = date.getDay(); // 요일 인덱스: 0(일)~6(토)

            const isToday = date.toDateString() === new Date().toDateString();
            if (isToday) {
              setTodayIndex(dayIndex);
            }
            return {
              day: isToday ? "오늘" : dayNames[dayIndex],
              steps: steps,
            };
          });

          setWeekData(formattedData);

          // 연속 방문 횟수
          let count = 0;
          for (let i = todayIndex - 1; i >= 0; i--) {
            if (formattedData[i].steps >= 0) count++;
            else break;
          }
          setVisitCount(count);
        } else {
          console.error(response.message || "데이터를 불러오는데 실패함");
        }
      } catch (error) {
        console.error("걸음수 데이터 가져오기 오류:", error);
      }
    };
    fetchWalkData();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="visit-modal-content">
        <div className="visit-modal-header">
          <div className="visit-modal-title">연속 방문 {visitCount}일차</div>
          <Dialog.Close asChild>
            <button className="modal-close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="visit-modal-body">
          <p className="visit-modal-small-text">
            {currentSteps > 10000
              ? "만보를 달성했습니다!"
              : "조금만 더 걸어서 목표치를 채우세요!"}
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
            <div>{today}</div>

            <div className="visit-modal-week-record-list">
              {weekData.map((item) => (
                <div
                  className="visit-modal-week-record-item"
                  key={item.day}
                  style={
                    item.day == "오늘"
                      ? { background: "#0064ff", color: "white" }
                      : {}
                  }
                >
                  <p>{item.day}</p>
                </div>
              ))}
            </div>
            <div className="visit-modal-week-record-steps">
              {weekData.map((item) => (
                <div className="visit-modal-week-record-step" key={item.step}>
                  <p>{item.steps}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
