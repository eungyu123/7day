import { API_BASE_URL, userId } from "../constant/constant";

export const getOneEgg = async (eggId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/oneEgg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eggId }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

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

// eggId, steps

export const updateEggState = async ({ eggId }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/state/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eggId }),
      // credentials: "include",
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const updateEggStep = async ({ steps }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/egg/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ steps }),
      // credentials: "include",
    });
    return res.json(); // { eggId : string, state : string, currentStep : Number}
  } catch (error) {
    throw error;
  }
};

export const doHatchApi = async ({ eggId }) => {
  const res = await fetch(`${API_BASE_URL}/egg/hatch/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eggId }),
  });

  return res.json();
};
