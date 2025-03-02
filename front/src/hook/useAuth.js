import { useState, useEffect } from "react";
import { checkAuthApi } from "../api/authApi";
import { checkAuth } from "../context/reducer/action/action";

export default function useAuth({ dispatch }) {
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const isAuthenticated = await checkAuthApi();
        dispatch(checkAuth({ isAuthenticated: isAuthenticated })); // 인증 상태 업데이트
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuth();
  }, [dispatch]);
}
