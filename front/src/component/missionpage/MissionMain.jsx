import "./MissionMain.css";
import MissionList from "./MissionList";

import { useState, useEffect } from "react";
import { getUser } from "../../api/userApi";
import { useAppContext } from "../../context/context";
import { setUser } from "../../context/reducer/action/action";
import {
  createUserMission,
  getUserMission,
  updateUserMission,
} from "../../api/missionApi";

export default function MissionMain() {
  const { dispatch } = useAppContext();
  const [missions, setMissions] = useState({});
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
        await createUserMission(); // 한 번만 생성
        const userMissions = await getUserMission();
        console.log(userMissions);
        setMissions(userMissions); // 가져온 데이터를 상태에 저장

        // dispatch(updateUserMission({ user: user.data }));
      } catch (error) {
        console.error("미션을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMissions();
  }, []);

  return (
    <div className="missionmaincontainer">
      <div className="missioninfocontainer">
        <div className="missioninfotetext">
          <p className="missioninfotextlg">미션</p>
          <p className="missioninfotextsm">미션을 수행하세요</p>
        </div>
      </div>
      <div className="missionmainlist">
        {Array.isArray(missions.missions) &&
          missions.missions.map((mission, index) => (
            <MissionList
              key={index}
              MissionContent={mission.missionGoal}
              IsComplete={mission.state === "complete"}
            />
          ))}
      </div>
    </div>
  );
}
