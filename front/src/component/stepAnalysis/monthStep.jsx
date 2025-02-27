import "../../page/stepAnalysisPage/stepAnalysisPage.css";
import "../../index.css";
import CustomCalendar from "./calendar";
import { useState } from "react";

export default function CharacterViewer() {
  return (
    <div className="step-analysis-container">
      <div className="step-analysis-header">
        <p>
          2월에는 만보를 <span>0번</span> 채웠어요
        </p>
        <p>조금만 더 힘내세요!</p>
      </div>
      <CustomCalendar />
    </div>
  );
}
