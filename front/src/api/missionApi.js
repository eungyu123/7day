import { API_BASE_URL, userId } from "../constant/constant";

export const getUserMisson = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/misson/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserMission = async ({
  missionId,
  Success,
  completedAt,
}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/misson/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ missionId, Success, completedAt }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
