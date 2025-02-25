import React, { useState } from "react";

const CurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation은 현재 브라우저에서 지원되지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null); // 이전 에러 초기화
      },
      (err) => {
        setError("위치 정보를 가져올 수 없습니다: " + err.message);
      }
    );
  };

  return (
    <div>
      <h1>React Geolocation Example</h1>
      <button onClick={getLocation}>내 위치 가져오기</button>

      {location && (
        <p>
          <strong>위도:</strong> {location.latitude}, <strong>경도:</strong>{" "}
          {location.longitude}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CurrentLocation;
