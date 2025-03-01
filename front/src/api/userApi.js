import { API_BASE_URL } from "../constant/constant";
import { googleId } from "../constant/constant";

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/main/users`, {
      method: "GET",
      credentials: "include",
    });

    // 에러바운드리에서 이걸 받음
    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("fetchUsers 요청 실패:", error);
    throw error; // 에러바운드리에서 이걸 받음
  }
};

export const updateUserName = async (newUserName) => {
  console.log(newUserName, googleId);
  try {
    const res = await fetch(`${API_BASE_URL}/main/users/${googleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newUserName: newUserName }),
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    throw error; // 네트워크 오류 또는 CORS 오류
  }
};

// app.put('/users/:id', updateUser);
