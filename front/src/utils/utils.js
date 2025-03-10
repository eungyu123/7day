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
