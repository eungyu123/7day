const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY; // Vite의 환경 변수 접근 방식
import KaKaoMapComponent from "../../component/kakaomap/KaKaoMapComponent";
import CurrentLocation from "../../component/kakaomap/CurrentLocation";

export default function KakaoMap() {
  return (
    <div className="">
      <KaKaoMapComponent />
      <CurrentLocation />
    </div>
  );
}
