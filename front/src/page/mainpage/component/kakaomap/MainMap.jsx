import MapButton from "./MapButton";
import Steps from "./Steps";
import KaKaoMapComponent from "./KaKaoMapComponent";
import "../../MainPage.css";

export default function MainMap() {
  return (
    <div className="main-map-wrapper">
      <Steps />
      <MapButton />
      <KaKaoMapComponent />
    </div>
  );
}
