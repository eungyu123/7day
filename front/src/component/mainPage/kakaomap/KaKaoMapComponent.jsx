import "./KaKaoMapComponent.css";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "../../../hook/useLocation";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import ReactLogo from "../../../assets/react.svg";

const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY; // Vite의 환경 변수 접근 방식

export default function KaKaoMapComponent() {
  // 카카오 로더 훅 로딩, 에러 처리시에 편리하다.
  const [loading, error] = useKakaoLoader({
    appkey: kakaoMapKey, // 발급 받은 APPKEY
  });

  const defaultLocation = { lat: 37.5665, lng: 126.978 }; // 서울 시청 좌표 예시
  const [location, locationError] = useLocation(); // location = { latitude, longitude }
  const [items, setItems] = useState([]);
  const itemsRef = useRef({});

  useEffect(() => {
    const eventItems = createRandomItem({
      count: 10,
      lat: 37.5665,
      lng: 126.978,
    }); // 시청역 위치 - 테스트임
    setItems(eventItems);
  }, []);

  function createRandomItem({ count, lat, lng }) {
    const items = new Array(count).fill(0).map(() => ({
      id: Math.random().toString(36).substring(2, 7), // 고유 ID 생성
      item: Math.random().toString(36).charAt(2).toUpperCase(), // 한 글자 랜덤
      lat: lat + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
      lng: lng + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
    }));

    return items;
  }

  function deleteItem(itemId) {
    // 아이템 종류에 따라 모달띄울지 그런것도 판단
    // 미션 깨는것도 판단

    // 애니메이션 시키는 코드
    const currentItem = itemsRef.current[itemId];
    if (currentItem) {
      currentItem.classList.add("fade-y-out-rotate");
    }

    // 1초 이후 삭제 (애니메이션 실행후 삭제)
    setTimeout(() => {
      console.log("삭제");
      setItems((prev) => prev.filter((v, i) => v.id !== itemId));
    }, 1000);
  }

  if (loading) return <div>Loading...</div>;
  if (locationError) return <div>{locationError}</div>;

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
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {" "}
          {items &&
            items.map((item) => {
              return (
                <CustomOverlayMap
                  key={item.id}
                  position={{
                    lat: item.lat,
                    lng: item.lng,
                  }}
                >
                  <div
                    className="marker"
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                    ref={(el) => (itemsRef.current[item.id] = el)} // itemsRef.current는 객체임
                  >
                    {/* {item.item} */}
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
