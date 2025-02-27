import "../../page/stepAnalysisPage/calendar.css";
import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(1); // 임시 현재 달: 2월
  const [data, setData] = useState({});

  useEffect(() => {
    const dummyData = {
      "2025-02-18": 6947,
      "2025-02-19": 4061,
      "2025-02-20": 5932,
      "2025-02-21": 7967,
      "2025-02-22": 1401,
      "2025-02-23": 959,
      "2025-02-24": 4650,
      "2025-02-25": 5595,
      "2025-02-26": 6262,
      "2025-02-27": 2755,
    };
    setData(dummyData);
  }, []);

  const months = [
    { value: 10, label: "11월" },
    { value: 11, label: "12월" },
    { value: 0, label: "1월" },
    { value: 1, label: "2월" },
  ];

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const monthData = [];
    let dayCounter = 1;

    for (let week = 0; week < 6; week++) {
      const weekData = [];
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        if (week === 0 && dayOfWeek < startDayOfWeek) {
          weekData.push({ day: null, steps: 0 });
        } else if (dayCounter > daysInMonth) {
          weekData.push({ day: null, steps: 0 });
        } else {
          const dateStr = `2025-${String(month + 1).padStart(2, "0")}-${String(
            dayCounter
          ).padStart(2, "0")}`;
          const steps = data[dateStr] || 0;

          weekData.push({
            day: dayCounter,
            steps: steps,
            isToday: month === 1 && dayCounter === 27, // (임시)현재 27일이 오늘
          });
          dayCounter++;
        }
      }
      monthData.push(weekData);
      if (dayCounter > daysInMonth) break;
    }

    return monthData;
  };

  const getYear = (month) => {
    return month <= 1 ? 2025 : 2024; // 년도 선택(?)은 작년, 오늘만 가능
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const monthData = getMonthData(getYear(currentMonth), currentMonth);

  return (
    <div className="calendar-container">
      {/* 월 선택 */}
      <div className="calendar-month-selector">
        {months.map((month) => (
          <div
            key={month.value}
            className={`calendar-month-item ${
              currentMonth === month.value ? "active" : ""
            }`}
            onClick={() => handleMonthChange(month.value)}
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
