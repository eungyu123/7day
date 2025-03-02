import { API_BASE_URL } from "../constant/constant";
import { googleId } from "../constant/constant";

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/users`, {
      method: "GET",
      credentials: "include",
    });

    // 에러바운드리에서 이걸 받음
    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("fetchUsers 요청 실패:", error);
    throw error; // 에러바운드리에서 이걸 받음
  }
};

export const updateUserName = async (newUserName) => {
  console.log(newUserName, googleId);
  try {
    const res = await fetch(`${API_BASE_URL}/main/users/${googleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newUserName: newUserName }),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    throw error; // 네트워크 오류 또는 CORS 오류
  }
};

/* =====================
 * Walk Data Section
 * ===================== */

export const getWalkData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/walkdatas/${googleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const getWeekWalkData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/weekWalkdatas/${googleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

/* =====================
 * Map Section
 * ===================== */

export const updateUserCoord = async ({ lng, lat }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/userCoord/${googleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lng, lat }),
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const getItems = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/items/${googleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
