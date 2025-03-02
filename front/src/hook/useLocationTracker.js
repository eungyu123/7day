import { useEffect } from "react";
import {
  setlocationError,
  setLocation,
} from "../context/reducer/action/action";

/** 위치 추적 훅 */
export const useLocationTracker = ({ dispatch }) => {
  let prevLocation = null;

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(
        setlocationError({
          locationError: "Geolocation은 현재 브라우저에서 지원되지 않습니다.",
        })
      );
      return;
    }

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };

          if (prevLocation) {
            const distance = calculateDistance(prevLocation, newLocation);
            const steps = Math.floor(distance / 0.6); // 60cm당 한 걸음
          }

          prevLocation = newLocation;
          dispatch(setLocation(newLocation));
          dispatch(setlocationError({ locationError: false }));
        },
        () => {
          dispatch(
            setlocationError({
              locationError: "위치 정보를 가져올 수 없습니다.",
            })
          );
        }
      );
    };

    const interval = setInterval(fetchLocation, 5000);
    fetchLocation();

    return () => clearInterval(interval);
  }, []);
};

const calculateDistance = ({ prev, curr }) => {
  if (!prev || !curr) return 0;
  const R = 6371; // 지구 반경 (KM)
  const dLat = ((curr.lat - prev.lat) * Math.PI) / 180;
  const dLng = ((curr.lng - prev.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((prev.lat * Math.PI) / 180) *
      Math.cos((curr.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // m 단위 반환
};
