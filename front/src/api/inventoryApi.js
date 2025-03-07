import { API_BASE_URL, userId } from "../constant/constant";

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
