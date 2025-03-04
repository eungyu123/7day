export const calculateDistance = ({ point1, point2 }) => {
  if (!point1 || !point2) return 0;
  const R = 6371; // 지구 반경 (KM)
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // m 단위 반환
};

// 월요일을 주의 시작이라고 보고 오늘까지의 날짜 데이터
export function getWeekDatesUntilToday() {
  const today = new Date("2025-03-05");
  const dayOfWeek = today.getDay(); // 0(일) ~ 6(토)
  const monday = new Date(today); // 오늘 날짜 복사

  // 이번 주 월요일 찾기 (일요일이면 6일 전, 그 외는 (요일 - 1)일 전)
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  // 월요일부터 오늘까지의 날짜 배열 생성
  const dates = [];
  const current = new Date(monday); // 월요일 날짜 복사

  while (current <= today) {
    dates.push(current.toISOString().split("T")[0]); // "YYYY-MM-DD" 형식으로 저장
    current.setDate(current.getDate() + 1); // 하루 증가
  }

  return dates;
}

export function getMaxConsecutiveDays(weekRecords) {
  let days = 0;
  let maxDays = 0;

  weekRecords.forEach((record) => {
    if (record.step > 0) {
      days++;
    } else {
      maxDays = Math.max(days, maxDays);
      days = 0;
    }
  });

  maxDays = Math.max(days, maxDays);

  return maxDays;
}

export function getKaclFromSteps(steps) {
  return steps * 0.04;
}
export function getKmFromSteps(steps) {
  return steps * 0.0007;
}

export function getDecimalPlaces(num) {
  const str = num.toString();
  const parts = str.split(".");
  return parts.length === 2 ? parts[1].length : 0;
}
