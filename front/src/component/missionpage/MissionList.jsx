import "./MissionList.css";

export default function MissionList({ MissionContent, IsComplete = false }) {
  return (
    <div className="missionlistcontainer">
      <p className="emojifont font-2xl">🎯</p>
      <p className={`${IsComplete ? "missioncomplete" : "missionincomplete"}`}>
        {MissionContent}
      </p>
    </div>
  );
}
