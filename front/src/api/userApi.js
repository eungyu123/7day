import { API_BASE_URL } from "../constant/constant";

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/main/users`, {
      method: "GET",
      credentials: "include",
    });

    // 에러바운드리에서 이걸 받음
    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("fetchUsers 요청 실패:", error);
    throw error; // 에러바운드리에서 이걸 받음
  }
};
