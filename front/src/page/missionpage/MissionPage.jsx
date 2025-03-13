import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";
import MissionMain from "../../component/missionpage/MissionMain";
import "./MissionPage.css";

export default function MissionPage() {
  return (
    <Container column={true}>
      <Header />
      <MissionMain />
    </Container>
  );
}
