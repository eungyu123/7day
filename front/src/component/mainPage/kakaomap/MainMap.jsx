import "./MainMap.css";
import MapButton from "./MapButton";
import Steps from "./Steps";
import KaKaoMapComponent from "./KaKaoMapComponent";

export default function MainMap() {
  return (
    <div className="main-map-wrapper">
      <Steps />
      <MapButton />
      <KaKaoMapComponent />
    </div>
  );
}
