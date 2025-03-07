import "../../page/stepAnalysisPage/stepAnalysisPage.css";
import "../../index.css";
import { useState, useEffect } from "react";

import { getWalkData } from "../../api/walkApi";

export default function WeekStep() {
  const [mounted, setMounted] = useState(false);
  const [weekData, setWeekData] = useState([]);

  // 일주일 데이터 가져오기
  useEffect(() => {
    const fetchWalkData = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로
          const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로
          return `${year}-${month}-${day}`;
        };

        const startDate = formatDate(sevenDaysAgo);
        const endDate = formatDate(today);

        const response = await getWalkData(startDate, endDate);

        if (response.type === "success" && response.stepRecords) {
          const stepRecords = response.stepRecords || [];
          stepRecords.sort((a, b) => new Date(a.date) - new Date(b.date)); // 걸음수 기록 날짜 순서대로 정렬
          console.log("걸음수 기록!!!! ", stepRecords);

          const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

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
          const allDates = getDateRange(start, end); // 일주일치 날짜 배열

          // 날짜로 걸음수 매핑
          const stepsMap = new Map(
            stepRecords.map((record) => [
              record.date.split("T")[0],
              record.steps,
            ])
          );
          console.log("stepsMap: ", stepsMap);

          const formattedData = allDates.map((date) => {
            const dateString = date.toISOString().split("T")[0];
            const steps = stepsMap.get(dateString) || 0; // 기록 없는 날은 0으로 설정
            const dayIndex = date.getDay(); // 요일 인덱스: 0(일)~6(토)

            const isToday = date.toDateString() === new Date().toDateString();
            return {
              day: isToday ? "오늘" : dayNames[dayIndex],
              steps: steps,
            };
          });

          setWeekData(formattedData);
          console.log("일주일치 데이터", formattedData);
        } else {
          console.error(response.message || "데이터를 불러오는데 실패함");
        }
      } catch (error) {
        console.error("걸음수 데이터 가져오기 오류:", error);
      } finally {
      }
    };
    fetchWalkData();
  }, []);

  const averageStep =
    weekData.length > 0
      ? Math.round(
          weekData.reduce((acc, curr) => acc + curr.steps, 0) / weekData.length
        )
      : 0;

  const maxStep =
    weekData.length > 0 ? Math.max(...weekData.map((item) => item.steps)) : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="step-analysis-container">
      <div className="step-analysis-header">
        <p>최근 7일 동안 하루</p>
        <p>
          평균 <span>{averageStep}</span>걸음 걸었어요
        </p>
      </div>
      <div className="week-step-main">
        <div className="week-step-graph-container">
          {weekData.map((item, index) => (
            <div className="week-step-graph-item" key={index}>
              {/* 걸음수 */}
              <div className="week-step-numberOfSteps">{item.steps}</div>

              {/* 막대 그래프 */}
              <div
                className="week-step-graph"
                style={{
                  height: mounted ? `${(item.steps / maxStep) * 200}px` : 0,
                }}
              ></div>

              {/* 요일 라벨 */}
              <div className="week-step-day-label">{item.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
