import "./ProfilePage.css";
import Container from "../../component/common/Container";
import RewardButton from "../../component/common/button/RewardButton";
import Header from "../../component/common/header/Header";

export default function ProfilePage() {
  return (
    <Container>
      <Header PageName="프로필" />
      <div className="profile-wrapper">
        {/* 프로필 3d 넣어야 함 */}
        <div className="profile-money">
          <span className="emojifont">💎</span>5000원
        </div>
        <div className="profile-steps font-xs">
          <span className="font-sm">3.02</span>
          <span className="font-xs">km</span> &nbsp;
          <span className="font-md">5012</span> &nbsp;
          <span className="font-sm">걸음</span>
        </div>
      </div>
      <div className="profile-title">
        <span className="emojifont">🎁</span>보상
      </div>
      <RewardButton
        imgSrc="/public/images/postic.jpg"
        description="GS25 
                     포스틱"
        rightIcon="chevron_right"
      />
    </Container>
  );
}
