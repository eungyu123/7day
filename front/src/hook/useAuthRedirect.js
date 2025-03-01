import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuth } from "../context/reducer/action/action";
import { checkAuthApi } from "../api/authApi";
export const useAuthRedirect = ({ appState, dispatch }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    const redirectToLogin = async () => {
      const resolvedState = await appState; // 얘도 비동기 처리되는듯..?
      if (
        !resolvedState.isAuthenticated &&
        location.pathname !== "/LoginPage"
      ) {
        navigate("/LoginPage", { replace: true }); // replace: true 라면 뒤로 가기 히스토리를 수정
      } else if (
        resolvedState.isAuthenticated &&
        location.pathname == "/LoginPage"
      ) {
        navigate("/");
      }
    };
    redirectToLogin();
  }, [appState.isAuthenticated, location]); // 처음 리액트 들어갔을때만 실행
};
