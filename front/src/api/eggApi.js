import { API_BASE_URL, userId } from "../constant/constant";

export const getEgg = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
      credentials: "include",
    });
    return res.json(); // {type, message, egg}
  } catch (error) {
    throw error;
  }
};

export const updateEggStep = async ({ eggId, steps }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eggId, steps }),
      credentials: "include",
    });
    return res.json(); // { eggId : string, state : string, currentStep : Number}
  } catch (error) {
    throw error;
  }
};

export const eggHatch = async ({ eggId, eggState }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eggId, eggState }),
      credentials: "include",
    });
    return res.json(); //  { type: string, message ?: string , pet: pet, }
  } catch (error) {
    throw error;
  }
};
