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