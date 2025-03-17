import { useEffect, useState, useRef } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useAppContext } from "../../../../context/context";

export default function WalkingCourseKaKaoMap({
  TrailItem,
  imageIndex,
  setImageIndex,
}) {
  const markersRef = useRef({});
  const { appState, dispatch } = useAppContext();
  const { location, locationError, locationLoading, user } = appState;

  if (locationError) return;
  if (locationLoading) return;
  console.log(TrailItem);
  const SPRITE_MARKER_URL =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
  // const SPRITE_MARKER_URL = "../../assets/marker_number_blue.png";
  const MARKER_WIDTH = 36;
  const MARKER_HEIGHT = 37;
  const SPRITE_WIDTH = 36;
  const SPRITE_HEIGHT = 691;
  const OFF_SET_X = 13;
  const OFF_SET_Y = 37;
  const normalOrigin = { x: 0, y: appState.trailIndex * 46 + 10 }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표

  return (
    <>
      <Map
        center={TrailItem.location}
        isPanto={true} // 부드럽게 움직이는것
        style={{
          width: "100%",
          height: "100%",
        }}
        level={6}
      >
        {TrailItem.landmarks.map((landmark, landmarkIndex) => (
          <CustomOverlayMap
            key={landmark._id}
            position={{
              lat: landmark.location.lat,
              lng: landmark.location.lng,
            }}
          >
            <div
              className={`wc-landmark-marker ${
                imageIndex == landmarkIndex && "selected"
              }`}
              ref={(el) => (markersRef.current[landmark._id] = el)}
              onClick={() => {
                setImageIndex(landmarkIndex);
              }}
            >
              <div className={`wc-landmark-marker-index `}>
                {String.fromCharCode(65 + landmarkIndex)}
              </div>
            </div>
          </CustomOverlayMap>
        ))}
        <MapMarker
          position={{
            lat: TrailItem.location.lat, // 마커 위치의 위도
            lng: TrailItem.location.lng, // 마커 위치의 경도
          }}
          image={{
            src: SPRITE_MARKER_URL,
            size: {
              width: MARKER_WIDTH,
              height: MARKER_HEIGHT,
            },
            options: {
              offset: {
                x: OFF_SET_X,
                y: OFF_SET_Y,
              },
              spriteSize: {
                width: SPRITE_WIDTH,
                height: SPRITE_HEIGHT,
              },
              spriteOrigin: normalOrigin,
            },
          }}
        />
      </Map>
    </>
  );
}
