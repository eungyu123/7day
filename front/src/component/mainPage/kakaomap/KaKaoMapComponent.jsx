import "./KaKaoMapComponent.css";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "../../../hook/useLocation";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import { useAppContext } from "../../../context/context";
import LocationErrorComp from "./LocationErrorComp";
import { calculateDistance } from "../../../utils/utils";
import { removeGiftsAPI } from "../../../api/userApi";
import { getUser } from "../../../api/userApi";
import { setUser } from "../../../context/reducer/action/action";
import HatcheryModal from "../../modal/HatcheryModal";
import ThreeDModel from "./ThreeModel";

import RewardModal from "../../modal/RewardModal";
import RouletteModal from "../../modal/RouletteModal";
import RouletteRewardModal from "../../modal/RouletteRewardModal";

export default function KaKaoMapComponent() {
  const giftsRef = useRef({});
  const hatcheryRef = useRef({});
  const { appState, dispatch } = useAppContext();
  const { location, locationError, locationLoading, user } = appState;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHatchery, setIsOpenHatchery] = useState(false);
  const [isOpenRewardModal, setIsOpenRewardModal] = useState(true);
  const [isOpenRouletteModal, setIsOpenRouletteModal] = useState(false);

  const [newReward, setNewReward] = useState(null);

  if (locationError) return <LocationErrorComp des={locationError} />;
  if (locationLoading) return;

  async function deleteItem(giftId) {
    const currentGift = giftsRef.current[giftId];

    const distance = calculateDistance({
      point1: location,
      point2: { lat: currentGift.dataset.lat, lng: currentGift.dataset.lng },
    });

    if (Math.floor(distance) > 15) {
      // return;
    }

    if (currentGift) {
      currentGift.classList.add("fade-y-out-rotate");
    }
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function setTimeOutfetch() {
      // ._id
      console.log("currentGift.dataset.reward", currentGift.dataset.reward);
      setNewReward(currentGift.dataset.reward);
      await delay(1000);
      setIsOpenRouletteModal(true);
    }

    await setTimeOutfetch();
  }

  async function openHatchery(hatcheryId) {
    const currHatchery = hatcheryRef.current[hatcheryId];

    const distance = calculateDistance({
      point1: location,
      point2: { lat: currHatchery.dataset.lat, lng: currHatchery.dataset.lng },
    });

    if (distance > 15) {
      // return;
    }

    setIsOpenHatchery(true);
  }

  return (
    <>
      {/* {isOpenHatchery && (
        <HatcheryModal setIsOpenHatchery={setIsOpenHatchery} />
      )} */}

      {/* {isOpenRewardModal && (
        <RewardModal
          isOpen={isOpenRewardModal}
          setIsOpen={setIsOpenRewardModal}
          goal={`${newReward.reward}을 획득하셨습니다.`}
        />
      )} */}

      {isOpenRouletteModal && (
        <RouletteModal
          isOpen={isOpenRouletteModal}
          setIsOpen={setIsOpenRouletteModal}
          gift={user.gifts[newReward]}
        />
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
            <ThreeDModel location={location} />
          </CustomOverlayMap>
        )}

        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {user.gifts &&
            user.gifts.map((gift, idx) => {
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
                    data-reward={idx}
                    data-lat={gift.lat}
                    data-lng={gift.lng}
                    ref={(el) => (giftsRef.current[gift._id] = el)} // giftsRef.current는 객체임
                  >
                    🎁
                  </div>
                </CustomOverlayMap>
              );
            })}
        </MarkerClusterer>
        {appState.hatchery.map((hatchery) => {
          return (
            <CustomOverlayMap
              position={{
                lat: hatchery.location.coordinates[1],
                lng: hatchery.location.coordinates[0],
              }}
            >
              <div
                className="imgWrapperHatchery"
                onClick={() => {
                  openHatchery(hatchery._id);
                }}
                data-lat={hatchery.location.coordinates[1]}
                data-lng={hatchery.location.coordinates[0]}
                ref={(el) => (hatcheryRef.current[hatchery._id] = el)}
              ></div>
            </CustomOverlayMap>
          );
        })}
      </Map>
    </>
  );
}
