import { API_BASE_URL } from "../constant/constant";
import { googleId } from "../constant/constant";

/* =====================
 * User Data Section
 * ===================== */

export const getUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/users/${googleId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserName = async (newUserName) => {
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

export const removeItemAPI = async ({ itemId }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/removeItems/${googleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
