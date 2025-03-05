import { API_BASE_URL, userId } from "../constant/constant";

export const getUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return res.json(); // {type, message, data: user}
  } catch (error) {
    throw error;
  }
};

export const updateUserName = async (newUserName) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
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

export const updateUserCoord = async ({ lng, lat }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/coord/${userId}`, {
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

export const generateGifts = async ({}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/generateGift/${userId}`, {
      method: "POST",
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

export const getGifts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/gift/${userId}`, {
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

export const removeGifts = async ({ giftId }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/removeItems/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ giftId }),
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const getUserFriend = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/friend/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserFriend = async ({ friendid }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/updateFriend/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendid }),
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
