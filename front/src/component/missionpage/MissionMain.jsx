import "./MissionMain.css";
import MissionList from "./MissionList";

export default function MissionMain() {
  const missions = [
    { MissionContent: "토스 광고 보기" },
    { MissionContent: "1000보 걷기", IsComplete: true },
    { MissionContent: "5000보 걷기" },
    { MissionContent: "10000보 걷기" },
    { MissionContent: "CU에서 100원 이상 계산하기", IsComplete: true },
  ];
  return (
    <div className="missionmaincontainer">
      <div className="missioninfocontainer">
        <div className="missioninfotetext">
          <p className="missioninfotextlg">미션</p>
          <p className="missioninfotextsm">미션을 수행하세요</p>
        </div>
      </div>
      <div className="missionmainlist">
        {missions.map((mission, index) => (
          <MissionList
            key={index}
            MissionContent={mission.MissionContent}
            IsComplete={mission.IsComplete}
          />
        ))}
      </div>
    </div>
  );
}
