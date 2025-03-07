import Header from "../../component/common/header/Header";
import "./WalkingPage.css";
import { useNavigate } from "react-router-dom";
import WalkingMain from "../../component/walkingpage/WalkingMain";
import Container from "../../component/common/Container";

export default function WalkingPage() {
  const navigate = useNavigate();

  return (
    <Container column={true}>
      <Header />
      <WalkingMain />
    </Container>
  );
}
