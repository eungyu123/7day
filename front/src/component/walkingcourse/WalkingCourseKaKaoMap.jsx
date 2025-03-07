import { useEffect, useState, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useAppContext } from "../../context/context";
import { updateUserTrail } from "../../api/trailAPi";

export default function WalkingCourseKaKaoMap({ TrailItem }) {
  const markersRef = useRef({});
  const { appState, dispatch } = useAppContext();
  const { location, locationError, locationLoading, user } = appState;

  if (locationError) return;
  if (locationLoading) return;
  console.log("TrailItem", TrailItem);
  const updateVisitLandmark = (landmarkId) => {
    updateUserTrail(landmarkId);
  };

  return (
    <>
      <Map
        center={TrailItem.location}
        isPanto={true} // 부드럽게 움직이는것
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
      >
        {TrailItem.landmarks.map((landmark) => (
          <MapMarker
            key={landmark._id} // 각 마커의 고유 키
            position={{
              lat: landmark.location.lat, // 마커 위치의 위도
              lng: landmark.location.lng, // 마커 위치의 경도
            }}
            title={landmark.name} // 마커에 마우스를 올리면 표시되는 타이틀
            ref={(el) => (markersRef.current[landmark._id] = el)}
            // ref={(el) => (giftsRef.current[gift._id] = el)} // giftsRef.current는 객체임

            onClick={() => updateVisitLandmark(landmark._id)}
          />
        ))}
      </Map>
    </>
  );
}
