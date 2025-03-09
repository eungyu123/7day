import { API_BASE_URL, userId } from "../constant/constant";

export const getStore = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/store/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ characters, pets }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
