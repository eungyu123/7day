import { useAppContext } from "../../context/context";
import "./WalkingMain.css";
import { setTrailLocation } from "../../context/reducer/action/action";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URLS } from "../../constant/constant";

export default function WalkingCard({
  TrailItem,
  idx,
  seletCardIdx,
  setSelectCardIdx,
}) {
  const navigate = useNavigate();

  const WalkingcourseClick = () => {
    // state로 정보를 전달
    navigate(PAGE_URLS.WalkingCoursePage, {
      state: { TrailItem },
    });
  };

  const moveToMarker = () => {
    if (seletCardIdx === idx) {
      setSelectCardIdx(null);
    } else {
      setSelectCardIdx(idx);
    }
    dispatch(setTrailLocation({ trailLocation: TrailItem.location }));
  };

  return (
    <div
      className={`wm-card-wrapper ${seletCardIdx == idx && "seleted"}`}
      onClick={() => WalkingcourseClick()}
    >
      <div
        className="wm-card-img"
        style={{
          backgroundImage: `url(http://localhost:3000/image/${TrailItem.image})`,
        }}
      ></div>

      <div className="wm-card-content">
        <div className="wm-card-content-title">{TrailItem.name}</div>
        <div className="wm-card-content-des">길이 {TrailItem.distance}</div>
      </div>
      <div
        className={`wm-card-content-marker `}
        style={{
          width: "36px",
          height: "37px",
          backgroundImage: `url(${SPRITE_MARKER_URL})`,
          backgroundSize: "36px 691px",
          backgroundPosition: `-2px -${idx * 46 + 10}px`, // 스프라이트 이미지에서 마커 영역
        }}
        key={idx}
        onClick={(e) => {
          e.stopPropagation();
          moveToMarker();
        }}
      ></div>
    </div>
  );
}

const SPRITE_MARKER_URL =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
