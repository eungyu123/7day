import { API_BASE_URL, userId } from "../constant/constant";

//export const updateInventoryData = async ({ newCharacter, newPet }) => {
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

export const updateInventoryData = async ({ newCharacter, newPet }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/inventory/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newCharacter, newPet }),
      // credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`서버 오류 발생: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};
