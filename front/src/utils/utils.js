import * as THREE from "three"; // Three.js import

export const calculateDistance = ({ point1, point2 }) => {
  if (!point1 || !point2) return 0;
  const R = 6371; // 지구 반경 (KM)
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // m 단위 반환
};

export function getSteps(distance) {
  return Math.floor(distance / 0.6);
}
export function getKaclFromSteps(steps) {
  return steps * 0.04;
}
export function getKmFromSteps(steps) {
  const str = String(steps * 0.0007).split(".");

  if (str[1] && str[1].length > 2) {
    return parseFloat(str[0] + "." + str[1].slice(0, 2));
  }

  return parseFloat(steps * 0.0007);
}

export function getDecimalPlaces(num) {
  const str = num.toString();
  const parts = str.split(".");
  return parts.length === 2 ? parts[1].length : 0;
}



// 방향 구하기

export function latLngToVector3(lat, lng, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180); // 위도를 라디안으로 변환 (θ)
  const theta = (lng + 180) * (Math.PI / 180); // 경도를 라디안으로 변환 (φ)

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi); // Y축이 위쪽 (위도)
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

export function calculateDirection({ point1, point2 }) {
  const prevPos = latLngToVector3(point1.lat, point1.lng);
  const newPos = latLngToVector3(point2.lat, point2.lng);

  return newPos.clone().sub(prevPos).normalize(); // 방향 벡터 (정규화)
}
 // THREE.Vector3(x, y, z)