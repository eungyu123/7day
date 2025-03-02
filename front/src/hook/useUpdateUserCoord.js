import { useEffect } from "react";
import { updateUserCoord } from "../api/allApi";
/** 사용자 위치 업데이트 훅 */
export const useUpdateUserCoord = (location) => {
  useEffect(() => {
    if (!location) return;

    const updateLocation = async () => {
      try {
        const data = await updateUserCoord(location);
      } catch (error) {
        console.error("위치 업데이트 실패:", error);
      }
    };

    const interval = setInterval(updateLocation, 20 * 60 * 1000);
    updateLocation();

    return () => clearInterval(interval);
  }, [location]); //location을 추가하면 위치 바뀔떄마다 업데이트
};
