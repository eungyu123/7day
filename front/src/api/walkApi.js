import { API_BASE_URL, userId } from "../constant/constant";

export const getWalkData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/walkdatas/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startDate, endDate }),
      credentials: "include",
    });
    return res.json(); // {type, message,data{userId, startDate, endDate, stepRecords[{date, steps}]}}
  } catch (error) {
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
