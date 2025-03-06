import { API_BASE_URL, userId } from "../constant/constant";

// api/getTrails.js
export const getTrails = async () => {
  try {
    // http://localhost:3000/trail/67c7ab335f743adc8dc272a3
    const response = await fetch(`${API_BASE_URL}/trail`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      // credentials: "include",
    });

    const data = await response.json();
    return data.data; // 산책로 목록 반환
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching trails");
  }
};

// api/getUserTrail.js
export const getUserTrail = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trail/userTrail/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      // credentials: "include",
    });
    console.log("response", response);

    const data = await response.json();
    return data.data; // 유저 산책 기록 반환
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user trail");
  }
};

// api/updateUserTrail.js
export const updateUserTrail = async (landmarkId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trail/userTrail/${userId}`, {
      method: "PUT", // PUT 메서드를 사용하여 명소 방문 체크 업데이트
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        landmarkId, // 요청 본문에 방문한 명소 ID를 포함
      }),
    });

    const data = await response.json();
    return data.data; // 업데이트된 유저 산책 기록 반환
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user trail");
  }
};
