import { API_BASE_URL, userId } from "../constant/constant";

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
