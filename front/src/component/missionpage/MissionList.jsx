import "./MissionList.css";
import { motion } from "framer-motion";

export default function MissionList({ MissionContent, IsComplete = false }) {
  return (
    <>
      <div className="missionlistcontainer">
        <p className="emojifont font-2xl">{IsComplete ? "✅" : "🎯"}</p>
        <p
          className={`${IsComplete ? "missioncomplete" : "missionincomplete"}`}
        >
          {MissionContent}{" "}
        </p>
        {IsComplete && <p className="emojifont gift-box">🎁</p>}
      </div>
    </>
  );
}
