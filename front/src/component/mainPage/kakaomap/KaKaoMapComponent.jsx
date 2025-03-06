import "./KaKaoMapComponent.css";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "../../../hook/useLocation";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import { useAppContext } from "../../../context/context";
import LocationErrorComp from "./LocationErrorComp";
import { calculateDistance } from "../../../utils/utils";
import { removeGiftsAPI } from "../../../api/userApi";
import { removeGift } from "../../../context/reducer/action/action";
import { getUser } from "../../../api/userApi";
import { setUser } from "../../../context/reducer/action/action";

export default function KaKaoMapComponent() {
  const itemsRef = useRef({});
  const { appState, dispatch } = useAppContext();
  const { location, locationError, locationLoading, user } = appState;
  const [isOpen, setIsOpen] = useState(false);
  const [newReward, setNewReward] = useState(null);

  if (locationError) return <LocationErrorComp des={locationError} />;
  if (locationLoading) return;

  async function deleteItem(giftId) {
    const currentItem = itemsRef.current[giftId];

    const distance = calculateDistance({
      point1: location,
      point2: { lat: currentItem.dataset.lat, lng: currentItem.dataset.lng },
    });

    if (Math.floor(distance) > 15) {
      // return;
    }

    if (currentItem) {
      currentItem.classList.add("fade-y-out-rotate");
    }

    // 서버로삭제 요청
    removeGiftsAPI({ giftId });
    const user = await getUser();
    dispatch(setUser({ user: user.data }));

    setNewReward(currentItem.dataset.reward);
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    setTimeout(() => {
      setIsOpen(false);
      setNewReward(null);
    }, 5000);
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
            <div className="imgWrapper"></div>
          </CustomOverlayMap>
        )}

        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {user.gifts &&
            user.gifts.map((gift) => {
              return (
                <CustomOverlayMap
                  key={gift._id}
                  position={{
                    lat: gift.lat,
                    lng: gift.lng,
                  }}
                >
                  <div
                    className="marker"
                    onClick={() => {
                      deleteItem(gift._id);
                    }}
                    data-reward={gift.reward}
                    data-lat={gift.lat}
                    data-lng={gift.lng}
                    ref={(el) => (itemsRef.current[gift._id] = el)} // itemsRef.current는 객체임
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
