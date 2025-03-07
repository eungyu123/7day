import { useNavigate } from "react-router-dom";
import "./WalkingInfo.css";
import { useUpdateUserTrail } from "../../reactQuery/useTrails";
import { PAGE_URLS } from "../../constant/constant";
import { useState } from "react";

export default function WalkingInfo({ TrailItem }) {
  const navigate = useNavigate();
  const [imageIndex, setImgageIndex] = useState(0);

  const WalkingcourseClick = () => {
    // state로 정보를 전달
    navigate(PAGE_URLS.WalkingCoursePage, {
      state: { TrailItem },
    });
  };

  const backGroundImages = [
    "bukhansan-dule-gil.jpg",
    "mongchontoseong-fortress.jpg",
    "OlympicPark.jpg",
    "seoul-trail-section.jpg",
  ];

  return (
    <div className="walkinginfodiv" onClick={WalkingcourseClick}>
      <div
        className="walkinginfomap"
        style={{
          backgroundImage: `url(http://localhost:3000/image/${backGroundImages[imageIndex]}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {/* 화살표 */}
        <div
          className="walking-wrapper right"
          onClick={(e) => {
            e.stopPropagation();
            setImgageIndex(
              (prev) =>
                (prev + 1 + backGroundImages.length) % backGroundImages.length
            );
          }}
        >
          <span className="material-symbols-outlined icon-posiiton">
            chevron_right
          </span>
        </div>
        <div
          className="walking-wrapper left"
          onClick={(e) => {
            e.stopPropagation();
            setImgageIndex((prev) => (prev - 1) % backGroundImages.length);
          }}
        >
          <span className="material-symbols-outlined icon-posiiton">
            chevron_left
          </span>
        </div>
        {/* 점들 */}
        <div className="walking-small-circle-wrapper">
          {backGroundImages.map((imageItem, i) => {
            return (
              <div
                className={`walking-small-circle ${
                  imageIndex === i ? "selected" : ""
                }`}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="walkinginfoname">
        <div className="walkinginfotext">
          <p className="walkinginfotextlg">{TrailItem.name}</p>
          <p className="walkinginfotextsm">5km</p>
        </div>
      </div>
    </div>
  );
}
