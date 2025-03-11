import { API_BASE_URL, userId } from "../constant/constant";

export const getRewards = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/rewards/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  } catch (error) {
    throw error;
  }
};
export const getReward = async (rewardId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reward`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rewardId }),
      // credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error("쿠폰 데이터 가져오기 실패:", error);
  }
};
