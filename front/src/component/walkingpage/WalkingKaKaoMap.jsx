import { useEffect, useState, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useAppContext } from "../../context/context";
import { updateUserTrail } from "../../api/trailAPi";
import {
  setTrailIndex,
  setTrailLocation,
} from "../../context/reducer/action/action";
export default function WalkingKaKaoMap({ TrailItem }) {
  const markersRef = useRef({});
  const { appState, dispatch } = useAppContext();
  const { location, locationError, locationLoading, user, trailLocation } =
    appState;

  if (locationError) return;
  if (locationLoading) return;

  const moveToTrail = ({ location, idx }) => {
    console.log(location, idx);
    dispatch(setTrailLocation({ trailLocation: location }));
    dispatch(setTrailIndex({ trailIndex: idx }));
  };

  return (
    <>
      <Map
        center={trailLocation || location}
        isPanto={true} // 부드럽게 움직이는것
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
      >
        {TrailItem.map((Trail, idx) => {
          const SPRITE_MARKER_URL =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
          // const SPRITE_MARKER_URL = "../../assets/marker_number_blue.png";
          const MARKER_WIDTH = 36;
          const MARKER_HEIGHT = 37;
          const SPRITE_WIDTH = 36;
          const SPRITE_HEIGHT = 691;
          const OFF_SET_X = 13;
          const OFF_SET_Y = 37;
          const normalOrigin = { x: 0, y: idx * 46 + 10 }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표

          return (
            <MapMarker
              key={Trail._id} // 각 마커의 고유 키
              position={{
                lat: Trail.location.lat, // 마커 위치의 위도
                lng: Trail.location.lng, // 마커 위치의 경도
              }}
              title={Trail.name} // 마커에 마우스를 올리면 표시되는 타이틀
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
              ref={(el) => (markersRef.current[Trail._id] = el)}
              onClick={() => {
                moveToTrail({ location: Trail.location, idx });
              }}
            />
          );
        })}
      </Map>
    </>
  );
}
