import "../../page/stepAnalysisPage/stepAnalysisPage.css";
import "../../index.css";
import { useState, useEffect } from "react";

export default function CharacterViewer() {
  const [mounted, setMounted] = useState(false);

  // 임시 일주일 데이터
  const weekData = [
    { day: "금", step: 7967 },
    { day: "토", step: 1401 },
    { day: "일", step: 959 },
    { day: "월", step: 4650 },
    { day: "화", step: 5595 },
    { day: "수", step: 6262 },
    { day: "오늘", step: 1594 },
  ];

  const averageStep = Math.round(
    weekData.reduce((acc, curr) => acc + curr.step, 0) / 7
  );
  const maxStep = Math.max(...weekData.map((item) => item.step));

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
