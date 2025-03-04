import { useEffect } from "react";
import { setGifts } from "../context/reducer/action/action";
import { googleSignOut } from "../api/authApi";
import { updateUserCoord, getGifts } from "../api/userApi";

export const useFetchItems = ({ appState, dispatch }) => {
  useEffect(() => {
    // 로컬스토리지에 userId 없으면 로그아웃 시키기
    if (!localStorage.getItem("userId")) {
      googleSignOut();
    }

    const fetchItems = async () => {
      const gifts = await getGifts();
      dispatch(setGifts({ gifts: gifts.gifts }));
    };

    const updateLocation = async () => {
      try {
        const data = await updateUserCoord(location);
      } catch (error) {
        console.error("위치 업데이트 실패:", error);
      }
    };
    updateLocation();
    fetchItems();
  }, []);
};
