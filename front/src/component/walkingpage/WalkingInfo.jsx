import { useNavigate } from "react-router-dom";
import "./WalkingInfo.css";
import { useUpdateUserTrail } from "../../reactQuery/useTrails";
import { PAGE_URLS } from "../../constant/constant";

export default function WalkingInfo({ TrailItem }) {
  const navigate = useNavigate();

  const WalkingcourseClick = () => {
    // state로 정보를 전달
    navigate(PAGE_URLS.WalkingCoursePage, {
      state: { TrailItem },
    });
  };

  return (
    <div className="walkinginfodiv" onClick={WalkingcourseClick}>
      <div
        className="walkinginfomap"
        style={{
          backgroundImage: `url(http://localhost:3000/image/${TrailItem.image}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      ></div>
      <div className="walkinginfoname">
        <div className="walkinginfotext">
          <p className="walkinginfotextlg">{TrailItem.name}</p>
          <p className="walkinginfotextsm">5km</p>
        </div>
      </div>
    </div>
  );
}
