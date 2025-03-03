import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuth } from "../context/reducer/action/action";
import { checkAuthApi } from "../api/authApi";
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
        navigate("/LoginPage", { replace: true }); // replace: true 라면 뒤로 가기 히스토리를 수정
      } else if (
        appState.isAuthenticated == true &&
        location.pathname == "/LoginPage"
      ) {
        navigate("/");
      }
    };

    redirectToLogin();
  }, [appState.isAuthenticated, location]); // 처음 리액트 들어갔을때만 실행
};
