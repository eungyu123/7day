import { API_BASE_URL, userId } from "../constant/constant";

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
