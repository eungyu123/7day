import "./ProfilePage.css";
import Container from "../../component/common/Container";
import RewardButton from "../../component/common/button/RewardButton";

export default function ProfilePage() {
  return (
    <Container>
      <div className="profile-wrapper">
        <div className="profile-money">💎5000원</div>
        <div className="profile-steps font-xs">
          <span className="font-sm">3.02</span>
          <span className="font-xs">km</span> &nbsp;
          <span className="font-md">5012</span> &nbsp;
          <span className="font-sm">걸음</span>
        </div>
      </div>
      <div className="profile-title">🎁보상</div>
      <RewardButton
        imgSrc="/public/images/postic.jpg"
        description="GS25 
                     포스틱"
        rightIcon="chevron_right"
      />
    </Container>
  );
}
