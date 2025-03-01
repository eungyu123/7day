import { useEffect } from "react";
import { checkAuthApi } from "../api/authApi";
import { checkAuth } from "../context/reducer/action/action";

export default function useAuth({ appState, dispatch }) {
  useEffect(() => {
    const fetchAuth = async () => {
      const isAuthenticated = await checkAuthApi();
      dispatch(checkAuth({ isAuthenticated })); // 인증 상태 업데이트
    };
    fetchAuth();
  }, []);
}
