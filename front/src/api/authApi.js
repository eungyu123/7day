import { API_BASE_URL } from "../constant/constant";

export const googleSignIn = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/googleSignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: token }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    localStorage.setItem("userId", data.userId);
    if (data.type === "success") {
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
      credentials: "include",
    });
    const data = await res.json();

    if (data.type == "success") {
      localStorage.removeItem("userId");
      window.location.reload();
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
