import "./MissionMain.css";
import MissionList from "./MissionList";

import { useState, useEffect } from "react";
import { useAppContext } from "../../../context/context";
import { setMission } from "../../../context/reducer/action/action";
import {
  createUserMission,
  getUserMission,
  updateUserMission,
} from "../../../api/missionApi";

export default function MissionMain() {
  const { dispatch } = useAppContext();

  const [missions, setMissions] = useState({});
  let userMissions;
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        userMissions = await getUserMission();
        console.log("userMissions:", userMissions);

        if (!userMissions || userMissions.length === 0) {
          console.log("미션 생성");
          await createUserMission();
          userMissions = await getUserMission();
        }

        console.log("get mission ", userMissions);
        setMissions(userMissions); // 가져온 데이터를 상태에 저장
        console.log("setmission까지 완료");
        dispatch(setMission({ missions: userMissions }));
      } catch (error) {
        console.error("미션을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMissions();
  }, [dispatch]);

  return (
    <div className="mission-main-container">
      <div className="mission-info-container">
        <div className="mission-info-text">
          <p className="mission-info-text-lg">미션</p>
          <p className="mission-info-text-sm">미션을 수행하세요</p>
        </div>
      </div>
      <div className="mission-main-list">
        {missions && Array.isArray(missions) && missions.length > 0 ? (
          missions.map((mission, index) => {
            return (
              <MissionList
                key={index}
                MissionContent={mission.missionId.missionContent}
                IsComplete={mission.success}
                getReward={mission.getReward}
                missionId={mission.missionId._id}
                rewardId={mission.missionId.rewardId}
              />
            );
          })
        ) : (
          <p>미션이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
