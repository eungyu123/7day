import Header from "../../component/common/header/Header";
import WalkingCourseMain from "../../component/walkingcourse/WalkingCourseMain";

export default function WalkingCoursePage() {
  return (
    <div>
      <Header PageName={"산책로"} BackNavigate="/WalkingPage" />
      <WalkingCourseMain />
    </div>
  );
}
