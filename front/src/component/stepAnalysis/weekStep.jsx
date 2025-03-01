import "../../page/stepAnalysisPage/stepAnalysisPage.css";
import "../../index.css";
import { useGetWeekWalkDataByGoogleId } from "../../hook/useUser";
const Week = ["일", "월", "화", "수", "목", "금", "토"];

export default function CharacterViewer() {
  const { data } = useGetWeekWalkDataByGoogleId();

  const weekData = data.map((v) => {
    const date = new Date(v.date);
    const dayIndex = date.getDay(); // 0~6 일~토
    const todayIndex = new Date().getDay();
    return {
      day: dayIndex == todayIndex ? "오늘" : Week[dayIndex],
      step: v.steps,
    };
  });

  const averageStep = Math.round(
    weekData.reduce((acc, curr) => acc + curr.step, 0) / 7
  );
  const maxStep = Math.max(...weekData.map((item) => item.step));

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
                  height: `${(item.step / maxStep) * 200}px`,
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
