const utcDate = new Date("2025-03-05T00:00:00Z"); // UTC 시간대에서 생성
const korDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // 한국 시간으로 변환

console.log(korDate); // 한국 시간으로 출력
