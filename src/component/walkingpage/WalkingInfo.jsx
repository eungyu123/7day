import { useNavigate } from "react-router-dom";
import "./WalkingInfo.css";

export default function WalkingInfo({
  walkingmapname,
  walkingmapnavigate,
  walkingmapkm,
}) {
  const navigate = useNavigate();

  const WalkingcourseClick = () => {
    // state로 정보를 전달
    navigate(walkingmapnavigate, {
      state: { walkingmapname, walkingmapkm },
    });
  };

  return (
    <div className="walkinginfodiv" onClick={WalkingcourseClick}>
      <div className="walkinginfomap"></div>
      <div className="walkinginfoname">
        <div className="walkinginfotext">
          <p className="walkinginfotext1">{walkingmapname}</p>
          <p className="walkinginfotext2">{walkingmapkm}</p>
        </div>
      </div>
    </div>
  );
}
