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

        const startDate = sevenDaysAgo.toISOString().split("T")[0];
        const endDate = today.toISOString().split("T")[0];

        const response = await getWalkData(startDate, endDate);

        if (response.type === "success" && response.stepRecords) {
          const stepRecords = response.stepRecords || [];

          const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

          const formattedData = stepRecords.map((record) => {
            const recordDate = new Date(record.date);
            const dayIndex = recordDate.getDay(); // 0(일)~6(토)

            const isToday =
              new Date(record.date).toDateString() === today.toDateString();
            return {
              day: isToday ? "오늘" : dayNames[dayIndex],
              steps: record.steps,
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
