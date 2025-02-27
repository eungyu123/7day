import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    // Google API 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id:
          "671783874321-non3vj4e8e19mm0k4hqre52beg03lpaf.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google?.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    const token = response.credential;
    console.log("Google Token:", token);

    try {
      const res = await fetch("http://localhost:3000/api/main/googleSignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: token }),
      });

      const data = await res.json();
      console.log("서버 응답:", data);

      if (data.type === "success") {
        window.location.href = "http://localhost:3000/";
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div className="container">
      <div className="title">7day walk</div>
      <div id="google-login-btn"></div>
    </div>
  );
};

export default LoginPage;
