import { useState, useEffect } from "react";
import { getWalkData } from "../../../../api/walkApi";
import { getKmFromSteps } from "../../../../utils/utils";
import "../../MainPage.css";
import { useAppContext } from "../../../../context/context";

export default function Steps() {
  const { appState, dispatch } = useAppContext();

  const [currentSteps, setCurrentSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setCurrentSteps(appState.todayWalk || 0);
    setDistance(getKmFromSteps(appState.todayWalk || 0));
  }, [appState.todayWalk]);

  return (
    <div className="main-map-steps-display font-xs">
      <span className="font-sm">{distance}</span>
      <span className="font-xs">km</span> &nbsp;
      <span className="font-md">{currentSteps}</span> &nbsp;
      <span className="font-sm">걸음</span>
    </div>
  );
}
