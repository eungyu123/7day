import "./MissionMain.css";
import MissionList from "./MissionList";

import { useState, useEffect } from "react";
import { useAppContext } from "../../context/context";
import { setMission } from "../../context/reducer/action/action";
import { createUserMission, getUserMission, updateUserMission } from "../../api/missionApi";

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

         // 2번째, 4번째 미션 자동 완료 처리
        //  handleAutoCompleteMissions(userMissions);
      } catch (error) {
        console.error("미션을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMissions();
  }, [dispatch]);

  // const handleAutoCompleteMissions = async (userMissions) => {
  //   const missionsToUpdate = userMissions.filter((_, index) => index === 0 || index === 3);
  //   console.log("missionstoupdate:", missionsToUpdate);
    
  //   for (const mission of missionsToUpdate) {
  //     if (!mission.success && mission._id) {  // mission._id가 존재하는지 확인
  //       console.log(`자동 완료 처리: ${mission._id}`);
        
  //       // updateUserMission을 호출할 때 missionId를 확실하게 전달
  //       await updateUserMission({
  //         missionId: mission._id,
  //         success: true,
  //         completedAt: new Date().toISOString(),
  //       });
  //     }
  //   }

  //   // 최신 미션 목록 다시 불러오기
  //   const updatedMissions = await getUserMission();
  //   setMissions(updatedMissions);
  //   dispatch(setMission({ missions: updatedMissions.data}));
//  };

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
            console.log(
              "Mission Reward:",
              mission.missionId?.rewardId?.content
            );
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
