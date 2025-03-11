import { useState, useEffect } from "react";
import "./MainMap.css";
import { getWalkData } from "../../../api/walkApi";
import { getKmFromSteps } from "../../../utils/utils";

export default function Steps() {
  const [currentSteps, setCurrentSteps] = useState(0);
  const [distance, setDistance] = useState(0);

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
  }, []);

  return (
    <div className="main-map-steps-display font-xs">
      <span className="font-sm">{distance}</span>
      <span className="font-xs">km</span> &nbsp;
      <span className="font-md">{currentSteps}</span> &nbsp;
      <span className="font-sm">걸음</span>
    </div>
  );
}
