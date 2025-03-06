import { API_BASE_URL, userId } from "../constant/constant";

export const getWalkData = async (startDate, endDate) => {
  try {
    let apiUrl = `${API_BASE_URL}/WalkDatas/${userId}`;

    // startDate와 endDate가 제공된 경우 쿼리 매개변수로 추가
    if (startDate && endDate) {
      apiUrl += `?startDate=${startDate}&endDate=${endDate}`;
    }

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    const res = fetch(`${API_BASE_URL}/main/todayWalkdata/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ steps }),
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
