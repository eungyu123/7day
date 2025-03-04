import { API_BASE_URL } from "../constant/constant";

export const googleSignIn = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/googleSignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: token }),
      credentials: "include", // 응답으로 오는 쿠키를 받을 수 있도록 설정
    });

    const data = await res.json();

    if (data.type === "success") {
      localStorage.setItem("userId", data._id);
      const nextUrl = data.nicknameEdit ? "/" : "/NicknamePage";
      window.location.href = `https://localhost:5173${nextUrl}`;
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
      localStorage.removeItem("userId");
      window.location.reload(); // 페이지 새로고침
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/checkAuth`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (data.type == "success") {
      return data.isAuthenticated;
    } else {
      return data.isAuthenticated;
    }
  } catch (error) {
    return false;
  }
};
