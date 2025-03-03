import { useEffect } from "react";
import {
  setlocationError,
  setLocation,
  setlocationLoading,
} from "../context/reducer/action/action";
import { calculateDistance } from "../utils/utils";

/** 위치 추적 훅 사용자 위치 변경될떄 업데이트 */
export const useLocationTracker2 = ({ dispatch }) => {
  let prevLocation = null;

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(
        setlocationError({
          locationError: "Geolocation은 현재 브라우저에서 지원되지 않습니다.",
        })
      );
      dispatch(setlocationLoading({ locationLoading: false }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };

        if (prevLocation) {
          const distance = calculateDistance({
            point1: prevLocation,
            point2: newLocation,
          });
          const steps = Math.floor(distance / 0.6); //60cm당 한걸음
        }

        prevLocation = newLocation;
        dispatch(setLocation(newLocation));
        dispatch(setlocationLoading({ locationLoading: false }));
        dispatch(setlocationError({ locationError: false }));
      },
      () => {
        dispatch(
          setlocationError({
            locationError: "위치 정보를 가져올 수 없습니다.",
          })
        );
        dispatch(setlocationLoading({ locationLoading: false }));
      },
      {
        enableHighAccuracy: true, // 더 정확한 위치 정보 사용
        maximumAge: 5000, // 5초 이내 캐싱된 위치 사용
        timeout: 10000, // 10초 이내에 위치를 못 가져오면 에러
      }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId); // 컴포넌트 언마운트 시 정리
    };
  }, []);
};
