import { API_BASE_URL, userId } from "../constant/constant";

export const getWalkData = async (startDate, endDate, insertUserId) => {
  try {
    // 입력받지 않으면 constant의 userId사용
    const finalUserId = insertUserId || userId;

    let apiUrl = `${API_BASE_URL}/WalkDatas/${finalUserId}`;

    // startDate와 endDate가 제공된 경우 쿼리 매개변수로 추가

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startDate, endDate }),

      // credentials: "include",
    });

    return res.json(); // {type, message,data{userId, startDate, endDate, stepRecords[{date, steps}]}}
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};

export const updateWalkData = async ({ steps }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/walkdatas/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ steps }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
