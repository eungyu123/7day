import { API_BASE_URL, userId } from "../constant/constant";

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
