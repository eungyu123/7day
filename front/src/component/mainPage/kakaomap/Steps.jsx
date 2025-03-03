import { useAppContext } from "../../../context/context";
import { useGetTodayWalk } from "../../../hook/useAPI";
import { getKaclFromSteps, getKmFromSteps } from "../../../utils/utils";
import "./MainMap.css";

export default function Steps() {
  const { data } = useGetTodayWalk();

  const distance = getKmFromSteps(data.result.steps);
  const calories = getKaclFromSteps(data.result.steps);
  return (
    <div className="main-map-steps-display font-xs">
      <span className="font-sm">{distance}</span>
      <span className="font-xs">km</span> &nbsp;
      <span className="font-md">{data.result.steps}</span> &nbsp;
      <span className="font-sm">걸음</span>
    </div>
  );
}
