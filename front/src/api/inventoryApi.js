import { API_BASE_URL, userId } from "../constant/constant";

export const getInventoryData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/inventory/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    // 데이터가 없으면 빈 객체 대신 빈 배열로 초기화

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateInventoryData = ({ newCharacter, newPet }) => {
  try {
    const res = fetch(`${API_BASE_URL}/inventory/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newCharacter, newPet }),
      credentials: "include",
    });
    return res.json();
  } catch (err) {
    throw err;
  }
};
