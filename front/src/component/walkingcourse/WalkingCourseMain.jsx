import "./WalkingCourseMain.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import WalkingCourseKaKaoMap from "./walkingCourseKaKaoMap";
import { useFetchUserTrail } from "../../reactQuery/useTrails";
export default function WalkingCourseMain() {
  const location = useLocation();
  // state로 정보 받기
  const { TrailItem } = location.state || { TrailItem: null };
  const { data } = useFetchUserTrail();

  return (
    <div className="walkingcoursemaincontainer">
      {/* Map */}
      {TrailItem && <WalkingCourseKaKaoMap TrailItem={TrailItem} />}

      {/* 리스트 */}
      <div className="walkingcourselist">
        {/*  */}
        {data.visitedLandmarks.map((landmark) => {
          console.log("randmark", landmark);
          return (
            <div className="walkingcoursediv">
              <div className="walkingcoursename">
                <div className="walkingcourseimg"></div>
                <div className="walkingcourselisttextdiv">
                  <p className="walkingcourselisttext">
                    {landmark.landmarkname}
                  </p>
                  <p className="walkingcourselisttext">1</p>
                </div>
              </div>
              <div
                className={`walkingcoursechk ${
                  landmark.visited ? "checked" : "unchecked"
                }`}
              >
                ✔
              </div>
            </div>
          );
        })}

        {/*  */}
      </div>
      <div className="walkingcoursemainbtncontainer">
        <div
          className={`walkingcoursemainbtn ${true ? "active" : ""}`}
          onClick={() => {}}
          disabled={true}
        >
          확인
        </div>
      </div>
    </div>
  );
}
