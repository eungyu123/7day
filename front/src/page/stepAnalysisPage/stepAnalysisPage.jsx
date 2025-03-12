import { useState } from "react";
import "../../index.css";
import "./stepAnalysisPage.css";
import WeekStep from "../../component/stepAnalysis/weekStep";
import MonthStep from "../../component/stepAnalysis/monthStep";
import Header from "../../component/common/header/Header";

export default function stepAnalysisPage() {
  return (
    <>
      <Header PageName={"걸음분석"} />
      <div className="step-container">
        <WeekStep />
        <MonthStep />
      </div>
    </>
  );
}
