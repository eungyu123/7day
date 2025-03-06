import { API_BASE_URL, userId } from "../constant/constant";

export const getEgg = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/${userId}`, {
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

export const getHatchery = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/hatch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });
    return res.json(); //
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
      // credentials: "include",
    });
    return res.json(); // { eggId : string, state : string, currentStep : Number}
  } catch (error) {
    throw error;
  }
};
