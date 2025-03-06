import WalkingInfo from "./WalkingInfo";
import "./WalkingMain.css";
import { useState, useEffect } from "react";
import { useFetchTrail, useFetchUserTrail } from "../../reactQuery/useTrails";
export default function WalkingMain() {
  const { data } = useFetchTrail();
  console.log(data);

  return (
    <div className="walkingmaincontainer">
      <div className="walkingmaininfocontainer1">
        <div className="walkingmaininfo">
          <p className="walkingmaininfotext1">산책로 추천</p>
          <p className="walkingmaininfotext2">이곳저곳 둘러보세요!</p>
        </div>
      </div>
      <div className="walkingmaininfolist">
        {/*  */}
        {data.map((TrailItem) => {
          return (
            <div className="walkingmaininfocontainer2">
              <WalkingInfo TrailItem={TrailItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
