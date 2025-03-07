import "../../page/stepAnalysisPage/stepAnalysisPage.css";
import "../../index.css";
import CustomCalendar from "./calendar";
import { useEffect, useState } from "react";

import { getWalkData } from "../../api/walkApi";

export default function CharacterViewer() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [pedometerCount, setPedometerCount] = useState(0);

  useEffect(() => {
    fetchPedometerCount();
  }, [currentMonth, currentYear]);

  const fetchPedometerCount = async () => {
    try {
      console.log("currentMonth: ", currentMonth);
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로
        const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로
        return `${year}-${month}-${day}`;
      };

      const startDate = formatDate(firstDay);
      const endDate = formatDate(lastDay);

      const response = await getWalkData(startDate, endDate);

      if (response.type === "success" && response.stepRecords) {
        const pedometerDays = response.stepRecords.filter(
          (record) => record.steps >= 10000
        );

        const count = pedometerDays.length;
        console.log("pedometerDays: ", pedometerDays);
        setPedometerCount(count);
      } else {
        console.error("데이터 불러오기 실패");
      }
    } catch (error) {
      console.error("만보 카운트 데이터 가져오기 에러 발생");
    }
  };

  const handleMonthChange = (month, year) => {
    setCurrentMonth(month + 1);
    setCurrentYear(year);
  };

  return (
    <div className="step-analysis-container">
      <div className="step-analysis-header">
        <p>
          {currentMonth + 1}월에는 만보를 <span>{pedometerCount}번</span>{" "}
          채웠어요
        </p>
        <p>조금만 더 힘내세요!</p>
      </div>
      <CustomCalendar />
    </div>
  );
}
