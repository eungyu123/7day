import Header from "../../../component/common/header/Header";
import WalkingCourseMain from "./component/WalkingCourseMain";
import Container from "../../../component/common/Container";

export default function WalkingCoursePage() {
  return (
    <Container column={true}>
      <Header BackNavigate="/WalkingPage" />
      <WalkingCourseMain />
    </Container>
  );
}
