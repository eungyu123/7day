import "./KaKaoMapComponent.css";
import { useEffect, useState, useRef } from "react";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "react-kakao-maps-sdk"; // 카카오 로더 훅 로딩, 에러 처리시에 편리하다.
import ReactLogo from "../../../assets/react.svg";
import LocationError from "./LocationError";
import { useAppContext } from "../../../context/context";

export default function KaKaoMapComponent() {
  const itemsRef = useRef({});
  const { appState, dispatch } = useAppContext();
  const { location, locationError } = appState;

  // function deleteItem(itemId) {
  //   const currentItem = itemsRef.current[itemId];
  //   if (currentItem) {
  //     currentItem.classList.add("fade-y-out-rotate");
  //   }

  //   // 1초 이후 삭제 (애니메이션 실행후 삭제)
  //   setTimeout(() => {
  //     setItems((prev) => prev.filter((v, i) => v.id !== itemId));
  //   }, 1000);
  // }

  if (locationError) return <LocationError des={locationError} />;

  return (
    <>
      {/* useLocation이 setInterval로 5초마다 현재위치로 지도 이동시킴,  현재위치가 안바뀌면 지도 이동 없음
          지도 이동빼고 내 위치만 이동시키고  내 위치가 많이 이동하면 그때 지도 조금 이동시키게 해도됨 */}
      <Map
        center={location || defaultLocation}
        isPanto={true} // 부드럽게 움직이는것
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
      >
        {location && (
          <CustomOverlayMap position={location}>
            <div className="imgWrapper">
              <img
                src={ReactLogo}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </CustomOverlayMap>
        )}
        {/* 지도 확대하면 보임  */}
      </Map>
    </>
  );
}
