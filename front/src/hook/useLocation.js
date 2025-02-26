import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  // intervalId 수동 제어를 원할땐 useState로 따로 리턴시켜줘야함

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation은 현재 브라우저에서 지원되지 않습니다.");
    }

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          setLocationError("위치정보를 가져올 수 없습니다.");
        }
      );
    };

    // 15초마다 위치정보를 갱신
    const intervalId = setInterval(fetchLocation, 3000);

    // 컴포넌트가 언마운트 될때 intervalId 객체 clear
    return () => clearInterval(intervalId);
  }, []);

  return [location, locationError];
};
