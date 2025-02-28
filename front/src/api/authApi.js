import { API_BASE_URL } from "../constant/constant";

export const googleSignIn = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/googleSignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: token }),
    });

    const data = await res.json();

    if (data.type === "success") {
      window.location.href = "http://localhost:5173/";
    }
  } catch (error) {
    console.error("에러 발생:", error);
  }
};

export const googleSignOut = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/googleSignout`, {
      method: "get",
      credentials: "include", // 쿠키포함해서 요청 보내기
    });
    const data = await res.json();

    if (data.type == "success") {
      window.location.reload(); // 페이지 새로고침
    }
  } catch (error) {
    console.log(error);
  }
};
