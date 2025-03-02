import "../../page/stepAnalysisPage/calendar.css";
// import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getWalkData } from "../../api/allApi";
// 리액트 쿼리 안쓰고 직접 패치한거

const Calendar = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; //2025-02-18 와 같은 형식
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 현재 월 (0~11)
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // 2025
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchWalkdata = async () => {
      const data = await getWalkData();
      console.log("data", data);
      const objectedData = data.reduce((acc, walkdata) => {
        acc[walkdata.date.split("T")[0]] = walkdata.steps;
        return acc;
      }, {});
      console.log("objectedData", objectedData);
      setData(objectedData);
    };
    fetchWalkdata();
  }, []);

  const months = useMemo(() => {
    const currentMonth = today.getMonth(); // 현재 월 (0~11)

    return Array(4)
      .fill()
      .map((_, i) => {
        const monthValue = (currentMonth - (3 - i) + 12) % 12;
        return { value: monthValue, label: `${monthValue + 1}월` };
      });
  }, []);

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

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
            isToday: dateStr == todayStr,
          });
          dayCounter++;
        }
      }
      monthData.push(weekData);
      if (dayCounter > daysInMonth) break;
    }

    return monthData;
  };

  //prettier-ignore
  const handleMonthChange = (month) => {
    if ([0, 1, 2].includes(currentMonth) && [9, 10, 11].includes(month)) {
      setCurrentYear(currentYear - 1);
    } else if ([9, 10, 11].includes(currentMonth) && [0, 1, 2].includes(month)) {
      setCurrentYear(currentYear + 1);
    }
    setCurrentMonth(month);
  };

  // currentYear 또는 currentMonth가 바뀔때 실행
  const monthData = getMonthData(currentYear, currentMonth);

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
