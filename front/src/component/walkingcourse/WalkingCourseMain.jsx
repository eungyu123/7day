import "./WalkingCourseMain.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function WalkingCourseMain() {
  const location = useLocation();
  // state로 정보 받기
  const { walkingmapname, walkingmapkm } = location.state || {
    walkingmapname: "알 수 없음",
    walkingmapkm: "0 km",
  };
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxClick = () => {
    setIsChecked((prev) => !prev);
  };

  const handleStartNavigation = () => {
    if (isChecked) {
      alert("네비게이션을 시작합니다!");
    } else {
      alert("산책로를 선택해주세요.");
    }
  };

  return (
    // <div>
    //   <h1>산책로 상세 정보</h1>
    //   <p>산책로 이름: {walkingmapname}</p>
    //   <p>산책로 거리: {walkingmapkm}</p>
    // </div>
    <div className="walkingcoursemaincontainer">
      <div className="walkingcourselist">
        <div className="walkingcoursediv">
          <div className="walkingcoursename">
            <div className="walkingcourseimg"></div>
            <div className="walkingcourselisttextdiv">
              <p className="walkingcourselisttext">{walkingmapname}</p>
              <p className="walkingcourselisttext">{walkingmapkm}</p>
            </div>
          </div>
          <div
            className={`walkingcoursechk ${
              isChecked ? "checked" : "unchecked"
            }`}
            onClick={handleCheckboxClick}
          >
            ✔
          </div>
        </div>
      </div>
      <div className="walkingcoursemainbtncontainer">
        <div className="walkingcoursemainbtn" onClick={handleStartNavigation}>
          네비게이션 시작
        </div>
      </div>
    </div>
  );
}
