import "./KaKaoMapComponent.css";
import { useEffect, useState, useRef } from "react";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "react-kakao-maps-sdk"; // 카카오 로더 훅 로딩, 에러 처리시에 편리하다.
import LocationError from "./LocationError";
import { useAppContext } from "../../../context/context";
import { removeItem } from "../../../context/reducer/action/action";
import { removeItemAPI } from "../../../api/allApi";
import { calculateDistance } from "../../../utils/utils";

export default function KaKaoMapComponent() {
  const itemsRef = useRef({});
  const { appState, dispatch } = useAppContext();
  const { location, locationError, locationLoading, items } = appState;
  const [isOpen, setIsOpen] = useState(false);
  const [newReward, setNewReward] = useState(null);
  // 로딩중 추가
  if (locationError) return <LocationError des={locationError} />;
  if (locationLoading) return;

  function deleteItem(itemId) {
    const currentItem = itemsRef.current[itemId];

    const distance = calculateDistance({
      point1: location,
      point2: { lat: currentItem.dataset.lat, lng: currentItem.dataset.lng },
    });
    // 거리차이가 15m 이상이라면 아이템 먹기 불가능
    if (Math.floor(distance) > 15) {
      console.log("너무 멉니다");
      return;
    }
    //애니메이션
    if (currentItem) {
      currentItem.classList.add("fade-y-out-rotate");
    }

    removeItemAPI({ itemId });
    setNewReward(currentItem.dataset.reward);
    console.log("currentItem.dataset.reward", currentItem.dataset.reward);
    setTimeout(() => {
      dispatch(removeItem({ itemId }));
      setIsOpen(true);
    }, 1000); // 1초 애니메이션후 아이템 삭제,  모달오픈

    setTimeout(() => {
      setIsOpen(false);
      setNewReward(null);
    }, 5000); // 5초 후 모달 삭제
  }

  return (
    <>
      {isOpen && (
        <div
          className="map-modal-wrapper"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div className="map-modal" onClick={(e) => e.stopPropagation()}>
            <div className="">{newReward}원 획득!</div>
          </div>
        </div>
      )}

      {/* useLocation이 setInterval로 5초마다 현재위치로 지도 이동시킴,  현재위치가 안바뀌면 지도 이동 없음
          지도 이동빼고 내 위치만 이동시키고  내 위치가 많이 이동하면 그때 지도 조금 이동시키게 해도됨 */}
      <Map
        center={location}
        isPanto={true} // 부드럽게 움직이는것
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
      >
        {location && (
          <CustomOverlayMap position={location}>
            <div className="imgWrapper"></div>
          </CustomOverlayMap>
        )}
        {/* 지도 확대하면 보임  */}
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {items &&
            items.map((item) => {
              return (
                <CustomOverlayMap
                  key={item._id}
                  position={{
                    lat: item.lat,
                    lng: item.lng,
                  }}
                >
                  <div
                    className="marker"
                    onClick={() => {
                      deleteItem(item._id);
                    }}
                    data-reward={item.reward}
                    data-lat={item.lat}
                    data-lng={item.lng}
                    ref={(el) => (itemsRef.current[item._id] = el)} // itemsRef.current는 객체임
                  >
                    🎁
                  </div>
                </CustomOverlayMap>
              );
            })}
        </MarkerClusterer>
      </Map>
    </>
  );
}

// {item: 'item', reward: 1, lat: 37.66419772004956, lng: 127.05448539051167, _id: '67c443919e9968a95bfa6437'}
// {item: 'item', reward: 4, lat: 37.58781024472157, lng: 127.08287056385954, _id: '67c443919e9968a95bfa6438'}
// {item: 'item', reward: 5, lat: 37.61149665991972, lng: 127.06747897948907, _id: '67c443919e9968a95bfa6439'}
// {item: 'item', reward: 5, lat: 37.61257980410447, lng: 127.09815807982834, _id: '67c443919e9968a95bfa643a'}
