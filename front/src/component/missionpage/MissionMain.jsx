import "./MissionMain.css";
import MissionList from "./MissionList";

import { useState, useEffect } from "react";
import { useAppContext } from "../../context/context";
import { setMission } from "../../context/reducer/action/action";
import {
  createUserMission,
  getUserMission,
  updateUserMission,
} from "../../api/missionApi";

export default function MissionMain() {
  const { dispatch } = useAppContext();
  // const [loading, setLoading] = useState(true);

  const [missions, setMissions] = useState({});
  let userMissions;
  // const missions = [
  //   { MissionContent: "토스 광고 보기" },
  //   { MissionContent: "1000보 걷기", IsComplete: true },
  //   { MissionContent: "5000보 걷기" },
  //   { MissionContent: "10000보 걷기" },
  //   { MissionContent: "CU에서 100원 이상 계산하기", IsComplete: true },
  // ];

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
        console.log("get mission ");
        setMissions(userMissions); // 가져온 데이터를 상태에 저장
        console.log("setmission까지 완료");
        dispatch(setMission({ missions: userMissions.data }));
      } catch (error) {
        console.error("미션을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMissions();
  }, [dispatch]);

  return (
    <div className="missionmaincontainer">
      <div className="missioninfocontainer">
        <div className="missioninfotetext">
          <p className="missioninfotextlg">미션</p>
          <p className="missioninfotextsm">미션을 수행하세요</p>
        </div>
      </div>
      <div className="missionmainlist">
        {missions && Array.isArray(missions) && missions.length > 0 ? (
          missions.map((mission, index) => {
            // console.log(
            //   "Mission Reward:",
            //   mission.missionId?.rewardId?.content
            // );
            return (
              <MissionList
                key={index}
                MissionContent={mission.missionId.missionContent}
                MissionReward={mission.missionId.rewardId.content}
                IsComplete={mission.success}
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
