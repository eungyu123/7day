import Header from "../../component/common/header/Header";
import WalkingCourseMain from "../../component/walkingcourse/WalkingCourseMain";
import Container from "../../component/common/Container";

export default function WalkingCoursePage() {
  return (
    <Container column={true}>
      <Header PageName={"산책로"} BackNavigate="/WalkingPage" />
      <WalkingCourseMain />
    </Container>
  );
}
