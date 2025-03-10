import { API_BASE_URL, userId } from "../constant/constant";

export const getUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      // credentials: "include",
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
      body: JSON.stringify({ nickname: newUserName }),
      // credentials: "include",
    });

    return res.json();
  } catch (error) {
    throw error; // 네트워크 오류 또는 CORS 오류
  }
};

export const updateUserCoord = ({ lng, lat }) => {
  try {
    fetch(`${API_BASE_URL}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: { type: "Point", coordinates: [lng, lat] },
      }),
      // credentials: "include",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateGift = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/generateGift/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
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
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const removeGiftsAPI = async ({ giftId }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/removeGift/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ giftId }),
      // credentials: "include",
    });
    return res.json();
    //이거 disfetch하는것도 좋을듯
  } catch (error) {
    throw error;
  }
};

export const getUserFriend = async () => {
  try {
    console.log("getuserapi 진입");

    const res = await fetch(`${API_BASE_URL}/user/friend/${userId}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserFriend = async ({ friendid }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/updatefriend/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendid }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
