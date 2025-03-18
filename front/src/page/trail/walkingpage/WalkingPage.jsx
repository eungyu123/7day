import Header from "../../../component/common/header/Header";
import WalkingMain from "./componenet/WalkingMain";
import Container from "../../../component/common/Container";

export default function WalkingPage() {
  return (
    <Container column={true}>
      <Header />
      <WalkingMain />
    </Container>
  );
}
