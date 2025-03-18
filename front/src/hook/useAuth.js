import { useState, useEffect } from "react";
import { checkAuthApi } from "../api/authApi";
import { checkAuth } from "../context/reducer/action/action";
// 로그인 여부 확인 훅
export function useAuth({ dispatch }) {
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const isAuthenticated = await checkAuthApi();
        console.log(isAuthenticated)
        dispatch(checkAuth({ isAuthenticated: isAuthenticated })); // 인증 상태 업데이트
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuth();
  }, [dispatch]);
}
