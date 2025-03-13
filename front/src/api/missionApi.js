import { API_BASE_URL, userId } from "../constant/constant";

export const createUserMission = async () => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/mission/createusermission/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
      }
    );
    return res.json();
  } catch (error) {
    throw error;
  }
};
export const getUserMission = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/mission/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserMission = async ({
  missionId,
  success,
  completedAt,
}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/mission/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ missionId, success, completedAt }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const finishMission = async (missionId, rewardId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mission/finish/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ missionId, rewardId }),
    });

    return response.json();
  } catch (error) {
    console.error("서버 오류:", error);
  }
};
