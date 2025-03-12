import { useEffect } from "react";
import {
  setlocationError,
  setLocation,
  setlocationLoading,
} from "../context/reducer/action/action";
import { calculateDistance, getSteps, calculateDirection} from "../utils/utils";
import { updateWalkData } from "../api/walkApi";
import { updateUserCoord } from "../api/userApi";
import { updateEggStep } from "../api/eggApi";

let testLat; 
let testLng;
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

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const fetchLocation = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const deltaLng = 15 / 111139
          
        // let newLocation = { lat: latitude, lng: longitude };
        let newLocation
        if(prevLocation) {
          newLocation = { lat: prevLocation.lat+deltaLng, lng: prevLocation.lng+deltaLng };
        } else {
          newLocation = { lat: latitude, lng: longitude }
        }
        

        if (prevLocation) {
          const distance = calculateDistance({
            point1: prevLocation,
            point2: newLocation,
          });
          const vector = calculateDirection({
            point1: prevLocation,
            point2: newLocation,
          })

          newLocation = {
            ...newLocation,
            vector: vector
          }

          console.log(newLocation); 

          const steps = getSteps(distance);
          if (steps) {
            const resWalk = await updateWalkData({ steps });
            const updateEgg = await updateEggStep({ steps });
          }
          await updateUserCoord(newLocation);
        }

        prevLocation = newLocation;
        dispatch(setLocation(newLocation));
        dispatch(setlocationLoading({ locationLoading: false }));
        dispatch(setlocationError({ locationError: false }));
      } catch (error) {
        console.log(error);
        dispatch(
          setlocationError({ locationError: "위치 정보를 가져올 수 없습니다." })
        );
        dispatch(setlocationLoading({ locationLoading: false }));
      }
    };

    fetchLocation(); // 초기 위치 가져오기
    const interval = setInterval(fetchLocation, 10000); // 3초마다 위치 업데이트

    return () => clearInterval(interval);
  }, []);
};
