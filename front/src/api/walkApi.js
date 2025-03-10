import { API_BASE_URL, userId } from "../constant/constant";

export const getWalkData = async (startDate, endDate) => {
  try {
    let apiUrl = `${API_BASE_URL}/WalkDatas/${userId}`;

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

export const updateWalkData = ({ steps }) => {
  try {
    fetch(`${API_BASE_URL}/walkdatas/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ steps }),
      // credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};

export const getTodayWalkData = async () => {
  try {
    console.log("walkapi진입");
    const res = await fetch(`${API_BASE_URL}/walkdata/todaysteps/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
    });
    if (!res.ok) {
      throw new Error('Failed to fetch today\'s walk data');
    }
    return res.json();
  } catch (error) {
    throw error;
  }
};