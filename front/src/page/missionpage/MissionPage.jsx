import Header from "../../component/common/header/Header";
import MissionMain from "../../component/missionpage/MissionMain";
import "./MissionPage.css";

export default function MissionPage() {
  return (
    <div className="missioncontainer">
      <Header />
      <MissionMain />
    </div>
  );
}
