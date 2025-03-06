import { API_BASE_URL, userId } from "../constant/constant";

export const updateWalkData = ({ steps }) => {
  try {
    const res = fetch(`${API_BASE_URL}/walkdatas/dailywalkdata/${userId}`, {
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
