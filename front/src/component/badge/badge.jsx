import "../../index.css";
import "../../page/badge/BadgePage.css";
import React from "react";

export default function badge({ name, progressStatus, image }) {
  return (
    <>
      <div className="badge-goal-item">
        <img src={image}></img>
        <p className="badge-goal-name">{name}</p>
        <div
          style={{
            backgroundColor: "#f0f0f0", // 전체 컨테이너 배경색
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <progress
            className="badge-goal-progressbar"
            value={progressStatus}
            max={100}
          />
        </div>
      </div>
    </>
  );
}
