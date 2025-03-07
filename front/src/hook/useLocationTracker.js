import { useEffect } from "react";
import {
  setlocationError,
  setLocation,
  setlocationLoading,
} from "../context/reducer/action/action";
import { calculateDistance, getSteps } from "../utils/utils";
import { updateWalkData } from "../api/walkApi";
import { updateUserCoord } from "../api/userApi";
import { updateEggStep } from "../api/eggApi";

/** 위치 추적 훅 시간으로 계산 */
export const useLocationTracker = ({ dispatch }) => {
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

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          if (prevLocation) {
            const distance = calculateDistance({
              point1: prevLocation,
              point2: newLocation,
            });

            const steps = getSteps(distance); // 60cm당 한 걸음
            if (steps) {
              updateWalkData({ steps: steps });
              updateEggStep({ steps });
            }
            updateUserCoord(newLocation);
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
        }
      );
    };
    fetchLocation();
    const interval = setInterval(fetchLocation, 2000);

    return () => clearInterval(interval);
  }, []);
};
