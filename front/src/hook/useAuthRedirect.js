import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 리다이렉션훅
export const useAuthRedirect = ({ appState }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    const redirectToLogin = async () => {
      if (
        appState.isAuthenticated == false &&
        location.pathname !== "/LoginPage"
      ) {
        console.log("appState.isAuthenticated" , appState.isAuthenticated)
        navigate("/LoginPage", { replace: true }); // replace: true 라면 뒤로 가기 히스토리를 수정
      } else if (
        appState.isAuthenticated == true &&
        location.pathname == "/LoginPage"
      ) {
        console.log("appState.isAuthenticated", appState.isAuthenticated)
        // navigate("/");
      }
    };

    redirectToLogin();
  }, [appState.isAuthenticated, location]); // 처음 리액트 들어갔을때만 실행
};
