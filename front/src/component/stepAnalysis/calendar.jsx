import "../../page/stepAnalysisPage/calendar.css";
// import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect } from "react";

import { getWalkData } from "../../api/walkApi";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    fetchMonthData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const fetchMonthData = async (year, month) => {
    try {
      // 해당 달의 첫날, 마지막날 계산
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const startDate = firstDay.toISOString().split("T")[0];
      const endDate = lastDay.toISOString().split("T")[0];

      // 한달치 데이터 가져오기
      const response = await getWalkData(startDate, endDate);

      if (response.type === "success" && response.stepRecords) {
        const stepRecords = response.stepRecords || [];
        stepRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
        const calendarData = generateCalendarData(
          year,
          month,
          response.stepRecords
        );
        setMonthData(calendarData);
      } else {
        console.error("한달치 불러오기 실패");
        const emptyCalendarData = generateCalendarData(year, month, []);
        setMonthData(emptyCalendarData);
      }
    } catch (error) {
      console.error("걸음수 데이터 불러오기 실패");
      const emptyCalendarData = generateCalendarData(year, month, []);
      setMonthData(emptyCalendarData);
    }
  };

  // 달력 데이터 생성
  const generateCalendarData = (year, month, stepRecords) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    console.log("stepRecord: ", stepRecords);
    const stepsMap = {};
    stepRecords.forEach((record) => {
      const formattedDate = record.date.split("T")[0];
      stepsMap[formattedDate] = record.steps;
    });

    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === month && today.getFullYear() === year;
    const currentDate = today.getDate();

    const monthData = [];
    let dayCounter = 1; // const에서 let으로 변경

    for (let week = 0; week < 6; week++) {
      const weekData = [];
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        if (week === 0 && dayOfWeek < startDayOfWeek) {
          weekData.push({ day: null, steps: 0 });
        } else if (dayCounter > daysInMonth) {
          weekData.push({ day: null, steps: 0 });
        } else {
          const dateStr = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(dayCounter).padStart(2, "0")}`;

          const steps = stepsMap[dateStr] || 0;

          weekData.push({
            day: dayCounter,
            steps: steps,
            isToday: isCurrentMonth && dayCounter === currentDate,
          });
          dayCounter++;
        }
      }
      monthData.push(weekData);
      if (dayCounter > daysInMonth) break;
    }

    return monthData; // 반환문 추가
  };
  const getMonths = () => {
    const months = [];
    const today = new Date();

    // 최근 4개월치만
    for (let i = 3; i >= 0; i--) {
      const monthDate = new Date(today);
      monthDate.setMonth(today.getMonth() - i);

      months.push({
        value: monthDate.getMonth(),
        year: monthDate.getFullYear(),
        label: `${monthDate.getMonth() + 1}월`,
      });
    }

    return months;
  };

  const months = getMonths();
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const handleMonthChange = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  return (
    <div className="calendar-container">
      {/* 월 선택 */}
      <div className="calendar-month-selector">
        {months.map((month) => (
          <div
            key={`${month.year}-${month.value}`}
            className={`calendar-month-item ${
              currentMonth === month.value && currentYear === month.year
                ? "active"
                : ""
            }`}
            onClick={() => handleMonthChange(month.value, month.year)}
          >
            {month.label}
          </div>
        ))}
      </div>

      {/* 요일 */}
      <div className="calendar-header">
        {days.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* 달력 표시 */}
      <div className="calendar-main">
        {monthData.map((week, weekIdx) => (
          <div key={weekIdx} className="calendar-week">
            {week.map((day, dayIdx) => (
              <div
                key={`${weekIdx}-${dayIdx}`}
                className={`calendar-day ${!day.day ? "empty" : ""} ${
                  day.isToday ? "today" : ""
                }`}
              >
                {day.day && (
                  <>
                    <div className="calendar-day-number">{day.day}</div>
                    <div
                      className={`calendar-day-steps ${
                        day.steps > 0 ? "has-steps" : ""
                      }`}
                    >
                      {day.steps > 0 ? day.steps.toLocaleString() : "0"}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
