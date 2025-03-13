import { useEffect } from "react";
import "./LoginPage.css";
import Container from "../../component/common/Container";
import { googleSignIn, googleSignOut } from "../../api/authApi";
import OverView from "./OverView.jsx"
import Test from "./Test.jsx";

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
          "967990155440-6kdar6oaceqj6fk04s469nebhdfe90d2.apps.googleusercontent.com",
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

    await googleSignIn(token);
  };

  googleSignOut();

  return (
    <Container>
      <div className="login-container">
        
        <OverView/>
        
        <div id="google-login-btn"></div>
        <br />
        {/* <div className="" onClick={() => signOut()}>
          로그아웃
        </div> */}
      </div>
    </Container>
  );
};

export default LoginPage;
