import "./ProfilePage.css";
import Container from "../../component/common/Container";
import RewardButton from "../../component/common/button/RewardButton";
import { useAppContext } from "../../context/context";
import Header from "../../component/common/header/Header";
import { getWalkData } from "../../api/walkApi";
import { getKmFromSteps } from "../../utils/utils";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constant/constant";
import { useFetchRewards } from "../../reactQuery/useUser";
import ProfileInfo from "./ProfileInfo";

export default function ProfilePage() {
  const { data: rewards } = useFetchRewards();
  const { appState, dispatch } = useAppContext();
  const [currentSteps, setCurrentSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  console.log(rewards);

  useEffect(() => {
    const fetchWalkData = async () => {
      const today = new Date().toISOString().split("T")[0];

      const response = await getWalkData(today, today);
      if (response.type === "success" && response.stepRecords.length > 0) {
        setCurrentSteps(response.stepRecords[0].steps);
        setDistance(getKmFromSteps(response.stepRecords[0].steps));
      }
    };
    fetchWalkData();
  });

  return (
    <Container>
      <Header PageName={"프로필"} />
      <div className="profile-wrapper">
        <div>캐릭터</div>
      </div>

      <ProfileInfo userPoint={appState.user.userPoint} distance={distance} currentSteps={currentSteps} />

      <div className="profile-title">
        <span className="emojifont">🎁</span>보상
      </div>

      <div className="profile-rewards-wrapper">
        {rewards.data.map((reward) => {
          if (reward) {
            return (
              <RewardButton
                imgSrc={`${API_BASE_URL}/image/${reward.image}`}
                description={`${reward.enterpriseName}
                        ${reward.content}`}
                rightIcon="chevron_right"
              />
            );
          }
        })}
      </div>
    </Container>
  );
}
