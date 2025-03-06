import "../../page/stepAnalysisPage/stepAnalysisPage.css";
import "../../index.css";
import { useState, useEffect } from "react";

import { getWalkData } from "../../api/walkApi";

export default function WeekStep() {
  const [mounted, setMounted] = useState(false);
  const [weekData, setWeekData] = useState([]);

  // 일주일 데이터 가져오기
  useEffect(()=> {
    const fetchWalkData = async () => {
      try {
        const response = await getWalkData();

        if(response.type === "success") {
          const stepRecords = response.data.stepRecords || [];

          const dayNames = ["일","월","화","수","목","금","토"];

          const today = new Date();
          today.setHours(0,0,0,0);

          const formattedDate = stepRecords.map(record => {
            const recordDate = new Date(record.date);
            recordDate.setHours(0,0,0,0);
          })

          const isToday = recordDate.getTime() === today.getTime();

          return {
            day: isToday ? "오늘" : dayNames[recordDate.getDay()],
              step: record.steps
          }
        }
      }
    }
  })

  // 임시 일주일 데이터
  const dummyData = [
    { day: "금", step: 7967 },
    { day: "토", step: 1401 },
    { day: "일", step: 959 },
    { day: "월", step: 4650 },
    { day: "화", step: 5595 },
    { day: "수", step: 6262 },
    { day: "오늘", step: 1594 },
  ];

  const averageStep = Math.round(
    dummyData.reduce((acc, curr) => acc + curr.step, 0) / 7
  );
  const maxStep = Math.max(...dummyData.map((item) => item.step));

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
          {dummyData.map((item, index) => (
            <div className="week-step-graph-item" key={index}>
              {/* 걸음수 */}
              <div className="week-step-numberOfSteps">{item.step}</div>

              {/* 막대 그래프 */}
              <div
                className="week-step-graph"
                style={{
                  height: mounted ? `${(item.step / maxStep) * 200}px` : 0,
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
