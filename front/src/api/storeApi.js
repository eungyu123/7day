import { API_BASE_URL, userId } from "../constant/constant";

export const getStore = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/store/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ characters, pets }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const buyCharacter = async(characterId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/store/buyCharacter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userId, characterId}),
    });
    return res.json();
  } catch(error) {
    throw error;
  }
};

export const buyPet = async(petId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/store/buyPet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userId, petId}),
    });
    return res.json();
  } catch(error) {
    throw error;
  }
};
